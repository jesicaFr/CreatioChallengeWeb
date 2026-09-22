import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, Subject, switchMap, tap } from 'rxjs';
import { Account } from './dto/account.dto';
import { CreatioAccountsService } from './services/creatio-accounts.service';

const MOCK_ACCOUNTS: Account[] = [];

@Component({
  selector: 'app-creatio-accounts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './creatio-accounts.html',
  styleUrl: './creatio-accounts.css'
})
export class CreatioAccountsComponent {
  private readonly accountsService = inject(CreatioAccountsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchChanges = new Subject<string>();
  private mockAccounts: Account[] = [...MOCK_ACCOUNTS];

  protected readonly accounts = signal<Account[]>([]);
  protected readonly search = signal('');
  protected readonly page = signal(1);
  protected readonly pageSize = signal(10);
  protected readonly total = signal(0);
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly successMessage = signal('');
  protected readonly formError = signal('');
  protected readonly isCreateDialogOpen = signal(false);
  protected readonly form = signal({
    name: '',
    code: 'CLI-2026-001',
    phone: '+54 11 1234-5678',
    web: 'https://www.empresacliente.com',
    typeId: '57412fad-53e6-df11-971b-001d60e938c6'
  });

  constructor() {
    this.searchChanges
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => this.page.set(1)),
        switchMap(() => this.loadAccounts()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.loadAccounts().subscribe();
  }

  protected onSearchChange(value: string): void {
    this.search.set(value);
    this.searchChanges.next(value.trim());
  }

  protected clearSearch(): void {
    this.onSearchChange('');
  }

  protected openCreateDialog(): void {
    this.formError.set('');
    this.successMessage.set('');
    this.isCreateDialogOpen.set(true);
  }

  protected closeCreateDialog(): void {
    this.isCreateDialogOpen.set(false);
    this.formError.set('');
    this.form.set({
      name: '',
      code: 'CLI-2026-001',
      phone: '+54 11 1234-5678',
      web: 'https://www.empresacliente.com',
      typeId: '57412fad-53e6-df11-971b-001d60e938c6'
    });
  }

  protected goToPage(nextPage: number): void {
    if (nextPage < 1 || nextPage > this.totalPages() || this.loading()) {
      return;
    }
    this.page.set(nextPage);
    this.loadAccounts().subscribe();
  }

  protected totalPages(): number {
    return Math.max(1, Math.ceil(this.total() / this.pageSize()));
  }

  protected firstItem(): number {
    return this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1;
  }

  protected lastItem(): number {
    return Math.min(this.page() * this.pageSize(), this.total());
  }

  protected retry(): void {
    this.successMessage.set('');
    this.formError.set('');
    this.loadAccounts().subscribe();
  }

  protected submitAccount(): void {
    const formValue = this.form();
    const name = formValue.name.trim();
    const code = formValue.code.trim();
    const phone = formValue.phone.trim();
    const web = formValue.web.trim();
    const typeId = formValue.typeId.trim();

    if (!name || !code || !typeId) {
      this.formError.set('Completá nombre, código y TypeId para continuar.');
      return;
    }

    const duplicate = this.mockAccounts.some((account) => {
      const existingName = (account.name ?? '').trim().toLowerCase();
      const existingCode = (account.code ?? '').trim().toLowerCase();
      return existingName === name.toLowerCase() || existingCode === code.toLowerCase();
    });

    if (duplicate) {
      this.formError.set('Ya existe una cuenta con ese nombre o código. No se creó otra cuenta duplicada.');
      this.successMessage.set('');
      return;
    }

    this.formError.set('');
    this.successMessage.set('');

    const payload = {
      Name: name,
      Code: code,
      Phone: phone,
      Web: web,
      TypeId: typeId
    };

    this.accountsService.createAccount(payload).pipe(
      catchError((response: HttpErrorResponse) => {
        const detail = response.status === 405
          ? 'El backend está rechazando el método POST en /api/Accounts (405 Method Not Allowed).'
          : response.error?.message ?? response.message ?? 'Error al crear la cuenta.';

        this.formError.set(detail);
        return of(null);
      })
    ).subscribe({
      next: () => {
        this.successMessage.set(`Cuenta "${name}" enviada según el payload real de Creatio.`);
        this.loadAccounts().subscribe();
        this.form.set({
          name: '',
          code: 'CLI-2026-001',
          phone: '+54 11 1234-5678',
          web: 'https://www.empresacliente.com',
          typeId: '57412fad-53e6-df11-971b-001d60e938c6'
        });
        this.isCreateDialogOpen.set(false);
      }
    });
  }

  private loadAccounts() {
    this.loading.set(true);
    this.error.set('');

    return this.accountsService.getAccounts(this.page(), this.pageSize(), this.search()).pipe(
      tap((result) => {
        const items = result.items ?? [];
        this.mockAccounts = items;
        this.accounts.set(items);
        this.total.set(result.total ?? items.length);
      }),
      catchError((response: HttpErrorResponse) => {
        this.mockAccounts = [...MOCK_ACCOUNTS];
        this.accounts.set([]);
        this.total.set(0);
        this.error.set(this.errorMessage(response));
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  private errorMessage(response: HttpErrorResponse): string {
    if (response.status === 0) {
      return 'No se pudo conectar con el backend de Creatio. Se usa la vista mock para continuar con la demo.';
    }
    if (response.status >= 500) {
      return 'La integración con Creatio devolvió un error. Revisá la configuración del backend.';
    }
    return response.error?.message ?? `La API respondió con el código ${response.status}.`;
  }
}
