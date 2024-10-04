import { defineStore } from 'pinia';
import router from '@/router';
const baseUrl = `${import.meta.env.VITE_API_URL}/`;
import sidebarItem from '../components/dashboard/SideBarItem'
interface User {
  id: number;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') as string) as User | null,
    returnUrl: null,
    permissions: JSON.parse(localStorage.getItem('permissions') as string),
    error: ''
  }),
  actions: {
    async login2({ Email, Password }: { Email: string, Password: string }) {

      const validEmail = 'dan.gonzalez@tiendasdaka.com';
      const validPassword = '123456';

      if (Email === validEmail && Password === validPassword) {

        const user = { id: 1, name: 'Dan Gonzalez', email: Email };
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        router.push(this.returnUrl || '/dashboard');

      } else {

        this.error = 'Usuario o contraseña incorrectas'

        setTimeout(() => {
          this.error = ''
        }, 6000);

      }
    },
    async login(username: string, password: string) {

      let objPermissionsUser: any = [
        {
          "title": "General",
          "icon": "src/assets/icons/menu.svg",
          "to": '/dashboard',
          "show": true,
          "hability": [{
            "view": true,
            "create": true,
            "edit": true,
            "delete": true,
          }]
        },
        {
          "title": "Calculos",
          "icon": "src/assets/icons/calendar.svg",
          "to": "/calculations",
          "show": true,
          "hability": [{
            "view": true,
            "create": true,
            "edit": true,
            "delete": true,
          }]
        },
        {
          "title": "Comisiones",
          "icon": "src/assets/icons/ticket.svg",
          "to": "/commissions",
          "show": true,
          "hability": [{
            "view": true,
            "create": true,
            "edit": true,
            "delete": true,
          }]
        },
        {
          "title": "Importar",
          "icon": "src/assets/icons/repuestos.svg",
          "to": "/spareParts",
          "show": true,
          "hability": [{
            "view": true,
            "create": true,
            "edit": true,
            "delete": true,
          }]
        },
        {
          "title":"Reportes",
          "icon": "src/assets/icons/reports.svg",
          "to": "/reports",
          "show": true,
          "hability": [{
            "view": true,
            "create": true,
            "edit": true,
            "delete": true,
          }]
        },
        {
          "title": "Usuarios",
          "icon": "src/assets/icons/user.svg",
          "to": "/usuarios",
          "show": true,
          "hability": [{
            "view": true,
            "create": true,
            "edit": true,
            "delete": true,
          }]
        },
      ]
      const res = await fetch(`${baseUrl}api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          "Email": 'admin@admin.com',
          "Password": '123',
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {

          response.json().then(async (data) => {
            this.user = data
            let permission = data.Permissions
            //permission = permission.replace(/'/g, '"');
           // let aux = JSON.parse(permission)
            //localStorage.setItem('user', JSON.stringify(data))

           /* let array = permission.map((item : any)=>JSON.stringify(item))
            console.log('data',array)
            */
            localStorage.setItem('user', JSON.stringify(data))
            let newSidebar: any = sidebarItem.map(sidebar => {
              objPermissionsUser.map((item: any) => {
                console.log('hiiii', sidebar.title == item.name)
                if (sidebar.title == item.name) {
                  sidebar.show = item.show
                }

              })
              localStorage.setItem('permissions', JSON.stringify(objPermissionsUser));


            })
            router.push('/dashboard');
          })







        })
        .catch((err) => {
          // router.push('/dashboard');



          console.log('err', err)
        })
      // update pinia state

    },
    clearError() {
      this.error = '';
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push({ name: 'Login' });
    }
  }
});
