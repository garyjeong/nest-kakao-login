// TODO: PickType으로 변경 필요
// 데이터베이스 테이블의 종속성

export class BaseSignUpRequestDto {
  email: string;
  username: string;
  password: string;
}

export class BaseSignInRequestDto {
  email: string;
  password: string;
}

export class BaseSignResponseDto {
  access_token: string;
}

export class BaseUserData {
  email: string;
  username: string;
  password: string;
}
