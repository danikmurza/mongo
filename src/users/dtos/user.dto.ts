import { Expose } from "class-transformer";
import { AddressEntry, OrdersEntry } from "./create-user.dto";
import { Role } from "../schema/user.schema";

export class UserDto {

    @Expose()
    readonly email: string;

    @Expose()
    readonly password: string;

    @Expose()
    readonly firstName: string;

    @Expose()
    readonly lastName: string;

    @Expose()
    readonly image: string;

    @Expose()
    readonly role: Role;

    @Expose()
    address:[] | AddressEntry[];

    @Expose()
    orders:[] | OrdersEntry[];

}
