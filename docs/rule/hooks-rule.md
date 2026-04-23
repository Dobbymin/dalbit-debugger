# Hooks 폴더 규칙

## 1. 기본 원칙

- 모든 네이밍은 **camelCase** 사용
- 모든 파일명은 `use` 접두사로 시작
- 파일명은 단수/복수를 의미에 맞게 구분

## 2. 폴더 구조

```
hooks/
├── _shared/          # 공용 훅
└── {domain}/         # 관심사별 도메인
```

## 3. React Query 훅 네이밍 규칙

HTTP 메서드와 사용하는 Query 함수를 기준으로 네이밍합니다.

| 파일명 | HTTP 메서드 | React Query | 설명 |
|---|---|---|---|
| `useGet{Domain}.ts` | GET | `useQuery` | 단건 조회 |
| `useGet{Domain}List.ts` | GET | `useQuery` | 목록 조회 |
| `useGet{Domain}Infinite.ts` | GET | `useInfiniteQuery` | 무한 스크롤 조회 |
| `usePost{Domain}.ts` | POST | `useMutation` | 리소스 생성 |
| `useUpdate{Domain}.ts` | PATCH | `useMutation` | 리소스 부분 수정 |
| `useReplace{Domain}.ts` | PUT | `useMutation` | 리소스 전체 교체 |
| `useDelete{Domain}.ts` | DELETE | `useMutation` | 리소스 삭제 |

> **PUT vs PATCH 구분 이유**
> - `useUpdate` → PATCH (부분 수정, 실무에서 가장 빈번)
> - `useReplace` → PUT (전체 교체, 의미상 명확히 구분)

## 4. 일반 훅 네이밍 규칙

React Query 외 훅은 **훅의 역할/행위** 를 기준으로 네이밍합니다.

| 패턴 | 예시 | 설명 |
|---|---|---|
| `use{State명}` | `useModal`, `useToast` | 상태 관리 |
| `use{명사}Form` | `useLoginForm`, `useSignUpForm` | 폼 상태 및 유효성 |
| `use{명사}Handler` | `useImageHandler` | 이벤트/액션 처리 |
| `use{형용사/부사}` | `useDebounce`, `useThrottle` | 동작 수식 유틸 |
| `use{명사}Observer` | `useIntersectionObserver` | 브라우저 API 감지 |
| `use{명사}Storage` | `useLocalStorage` | 스토리지 접근 |
| `use{명사}Context` | `useAuthContext` | Context 접근 래퍼 |

## 5. `_shared` 사용 기준

아래 조건 중 **하나 이상** 해당하면 `_shared`에 배치합니다.

- 2개 이상의 도메인에서 사용
- 도메인 비즈니스 로직에 **무관한** 순수 유틸성 훅
- 브라우저 API, 전역 상태, 공용 Context를 다루는 훅

```
_shared/
├── useDebounce.ts
├── useIntersectionObserver.ts
├── useLocalStorage.ts
└── useMediaQuery.ts
```

## 6. 전체 예시 구조

```
hooks/
├── _shared/
│   ├── useDebounce.ts
│   ├── useIntersectionObserver.ts
│   └── useLocalStorage.ts
│
├── auth/
│   ├── usePostLogin.ts          # POST   /auth/login
│   ├── usePostSignUp.ts         # POST   /auth/signup
│   ├── useDeleteLogout.ts       # DELETE /auth/logout
│   ├── useModal.ts              # 로그인 모달 상태
│   └── useAuthContext.ts        # AuthContext 접근
│
└── user/
    ├── useGetUser.ts            # GET    /users/:id
    ├── useGetUserList.ts        # GET    /users
    ├── useUpdateUser.ts         # PATCH  /users/:id
    ├── useDeleteUser.ts         # DELETE /users/:id
    └── useUserForm.ts           # 유저 정보 수정 폼
```