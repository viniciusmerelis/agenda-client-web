import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './modules/notfound/notfound.component';
import {AppLayoutComponent} from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'usuarios', loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule) },
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
