import { Injectable } from '@angular/core';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class SessionService
{
  constructor()
  {
  }



  getIsLogin(): boolean
  {
    if(sessionStorage['isLogin'] == "true")
    {
      return true;
    }
    else
    {
      return false;
    }
  }



  setIsLogin(isLogin: boolean): void
  {
    sessionStorage['isLogin'] = isLogin;
  }



  getCurrentMember(): Member
  {
    return JSON.parse(sessionStorage['currentMember']);
  }



  setCurrentMember(currentMember: Member | null): void
  {		 
    sessionStorage['currentMember'] = JSON.stringify(currentMember);
  }



  getUsername(): string
  {
    return sessionStorage['username'];
  }



  setUsername(username: string | undefined): void
  {
    sessionStorage['username'] = username;
  }
  
  
  
  getPassword(): string
  {
    return sessionStorage['password'];
  }



  setPassword(password: string | undefined): void
  {
    sessionStorage['password'] = password;
  }
  
  
  
  checkAccessRight(path : string): boolean
  {
    console.log("********** path: " + path);

    if(this.getIsLogin())
    {
      return true;
    } else {
      return false;
    }

  }
}
