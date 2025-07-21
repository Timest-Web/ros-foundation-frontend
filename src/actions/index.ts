/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route";


export async function doSocialLogin(formData:any) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/home" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData:any) {
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}


