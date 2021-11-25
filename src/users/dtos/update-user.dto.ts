import {IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {AddressEntry, OrdersEntry} from "./create-user.dto";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AddressEntry)
    address: AddressEntry;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OrdersEntry)
    orders: OrdersEntry;

}
