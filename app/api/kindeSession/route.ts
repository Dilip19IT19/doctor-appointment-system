
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";

export async function GET() {
    const { isAuthenticated,getUser} = getKindeServerSession();
    
    const authenticated = await isAuthenticated();
    const user = await getUser();
    // const firstname=user?.given_name;
    // const lastname=user?.family_name;
    // const email=user?.email;
    // const pic=user?.picture;
    // console.log(user)
   

    return NextResponse.json({ authenticated,user});
}