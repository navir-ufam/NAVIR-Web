import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TipoUsuario } from '../../../common/enums';

export class CriarUsuarioDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  senha: string;

  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;

  @IsOptional()
  @IsString()
  link_lattes?: string;

  @IsBoolean()
  aceite_termos: boolean;
}
