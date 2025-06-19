import { Routes } from '@angular/router';
import { MainPageComponent } from './features/main-page/main-page.component';
import { AlunosComponent } from './features/alunos/alunos.component';
import { MateriasComponent } from './features/materias/materias.component';
import { QuestoesComponent } from './features/questoes-grupo/questoes/questoes.component';
import { ForumComponent } from './features/forum/forum.component';
import { AnoLetivoComponent } from './features/ano-letivo/ano-letivo.component';
import { MenuEnsinoComponent } from './features/menu-ensino/menu-ensino.component';
import { ResolverQuestaoComponent } from './features/questoes-grupo/resolver-questao/resolver-questao.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './auth.guard';
import { ApostilasComponent } from './features/apostilas-grupo/apostilas/apostilas.component';
import { CadastroApostilaComponent } from './features/apostilas-grupo/cadastro-apostila/cadastro-apostila.component';
import { CadastroQuestaoComponent } from './features/questoes-grupo/cadastro-questao/cadastro-questao.component';
import { ApostilaTopicoComponent } from './features/apostilas-grupo/apostila-topico/apostila-topico.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { CadastroUsuarioComponent } from './features/cadastro-usuario/cadastro-usuario.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'materias', component: MateriasComponent, canActivate: [AuthGuard]  },
  { path: 'apostilas', component: ApostilasComponent, canActivate: [AuthGuard]  },
  { path: 'apostila-topico', component: ApostilaTopicoComponent, canActivate: [AuthGuard]  },
  { path: 'cadastro-apostila', component: CadastroApostilaComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor']}},
  { path: 'questoes', component: QuestoesComponent, canActivate: [AuthGuard]  },
  { path: 'cadastro-questao', component: CadastroQuestaoComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] }},
  { path: 'resolver-questao', component: ResolverQuestaoComponent, canActivate: [AuthGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'alunos', component: AlunosComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  { path: 'ano-letivo/:materia', component: AnoLetivoComponent, canActivate: [AuthGuard] },
  { path: 'menu-ensino/:ano', component: MenuEnsinoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];