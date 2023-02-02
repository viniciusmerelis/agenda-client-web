import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'clientes', loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule) },
                    { path: 'designers', loadChildren: () => import('./modules/designer/designer.module').then(m => m.DesignerModule) },
                    { path: 'agendamentos', loadChildren: () => import('./modules/agendamento/agendamento.module').then(m => m.AgendamentoModule) }
                ],
            },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
