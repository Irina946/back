import { TUserSchema, UserModel } from "./user.model";

export async function createUser(user: TUserSchema): Promise<boolean> {
    const isUserExist = (await readUserByEmail(user.email)) !== null;
    if (isUserExist) {
        return false;
    }

    const users = new UserModel(user);
    console.log(user)
    await users.save();
    return true
    
}

export async function readUserByEmail(email: string): Promise<TUserSchema | null> {
    const users = await UserModel.find({ email });
    return users[0] ?? null;
}


export async function deleteUserByEmail(email: string) {
    await UserModel.deleteOne({ email });
}

export async function updateUserByEmail(email: string, newFields: Partial<TUserSchema>) {
    await UserModel.updateOne({email}, newFields)
}

export async function readAllUser(): Promise<TUserSchema[] | null> {
    const users = await UserModel.find({})
    return users ?? null
}
