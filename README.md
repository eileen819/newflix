# 📺 NEWFLIX

사이트 주소와 화면 캡쳐해서 넣기  
🔗 **배포 주소:** [NEWFLIX](https://newflix-eileen.vercel.app/)

## 📌 프로젝트 개요

- **NEWFLIX**는 TMDB API를 활용하여 **최신 영화와 TV쇼 정보를 실시간으로 제공하는 미디어 플랫폼**입니다.
- Netflix UI/UX를 재해석한 웹 어플리케이션으로, **TanStack Query(구 React-Query)를 통한 캐싱 전략, 반응형 UI, 애니메이션 전환** 등 최신 프론트엔드 실무 기술을 종합적으로 적용하여 최적의 사용자 경험을 제공하는 데 중점을 두었습니다.
- 특히 **Vercel Functions 기반 서버리스 API 래핑을 통한 보안 강화, Framer Motion을 활용한 자연스러운 모달 전환 애니메이션, Swiper 기반 캐러셀 UI** 등 다양한 기술을 통합하여 **실제 서비스 수준의 인터랙션과 성능을 구현**했습니다.
- 본 프로젝트는 단순 학습을 넘어, **데이터 페칭 최적화·UX 개선·UI 애니메이션 설계**와 같은 실무 핵심 과제를 직접 해결하며 프론트엔드 개발 역량을 검증했습니다.

## 💡 주요 기능

### ✅ 최신 영화 및 TV쇼 정보 제공

- **TMDB API 연동**을 통해 최신 영화/TV쇼 데이터를 실시간 제공
- `TanStack Query`의 **데이터 캐싱 및 요청 최적화**로 API 호출 횟수 최소화 & 빠른 UX 보장
- `Swiper` 기반 캐러셀 슬라이더를 적용하여 Netflix-style UI 구현

### ✅ 검색 기능 제공

- 영화 및 TV쇼 **통합 검색 기능** 제공
- `React-Hook-Form`으로 검색 **폼 상태 관리 및 데이터 유효성 검증**
- `useSearchParams`로 쿼리를 읽어 라우팅과 결과를 동기화하여 **뒤로가기/새로고침/공유 시 동일 결과 복원 지원**
- `Axios` + `TanStack Query`로 **검색 결과 캐싱 및 로딩 상태를 관리**

### ✅ 상세 정보 모달 제공

- 선택한 콘텐츠의 **줄거리, 장르, 평점 등의 상세 정보 제공**
- `Framer Motion`의 `layoutId`로 **부드럽고 직관적인 모달 전환 애니메이션** 구현
- `React-Youtube`로 **트레일러 자동 재생 지원**, 트레일러 부재 시 공식 이미지로 대체하여 **Fallback UX 강화**

## 🔎 역할과 기여도

- 개인 프로젝트로 **기획부터 설계, 개발, 배포까지 프론트엔드 전 과정을 단독으로 주도**
- **React + TypeScript 기반 아키텍처 설계**로 컴포넌트 재사용성과 유지보수성을 확보
- **사용자 경험(UX) 최적화**
  - `TanStack Query` + `Axios`로 **데이터 Fetching & 캐싱 전략 수립** → API 호출 최소화 & 빠른 응답성 확보
  - `Framer Motion`으로 **자연스러운 모달 전환 및 인터랙션 애니메이션** 구현 → 몰입도 높은 사용자 경험 제공
  - `Swiper` 기반 **캐러셀 UI** 적용 → Netflix-style 콘텐츠 탐색 경험 구현
- **네트워크 효율 & 보안 강화**: 서버리스 API 래핑으로 API Key 보호 및 안정적 데이터 제공
- **자동 배포 환경 구축**: Vercel CI/CD 파이프라인을 활용해 커밋 기반 자동 배포 지원

## 🛠️ 사용한 기술 스택

| 분류                  | 기술/도구                                                                |
| --------------------- | ------------------------------------------------------------------------ |
| **Development**       | React, TypeScript, React Router DOM                                      |
| **State & Data**      | TanStack Query (React Query), Axios, React Hook Form                     |
| **UI & Styling**      | styled-components, styled-reset, Swiper, react-icons                     |
| **Animation**         | Framer Motion, React-Youtube                                             |
| **API & Data Source** | TMDB API (The Movie Database)                                            |
| **Serverless/API**    | Vercel Functions (TMDB 프록시/API Key 보안, 헤더 필터링, 요청 쿼터 제어) |
| **Deployment**        | Vercel (GitHub 연동 CI/CD, 커밋 기반 자동 배포)                          |

## 📁 프로젝트 구조

```
api (Vercel Functions(서버리스 API))
 ┣ getMovieDetails.js
 ┣ getMovieVideo.js
 ┣ getMovies.js
 ┣ getSearchResults.js
 ┣ movieInstance.js
 src
 ┣ @types
 ┃ ┣ swiper.d.ts
 ┃ ┗ youtube.d.ts
 ┣ api (클라이언트 API 요청 모듈)
 ┃ ┣ api.ts
 ┃ ┣ interfaceData.ts
 ┃ ┗ requests.ts
 ┣ components
 ┃ ┣ box
 ┃ ┃ ┣ Box.tsx
 ┃ ┃ ┣ SearchBox.tsx
 ┃ ┃ ┗ boxStyle.tsx
 ┃ ┣ header
 ┃ ┃ ┣ Header.tsx
 ┃ ┃ ┣ SearchBar.tsx
 ┃ ┃ ┗ headerStyle.tsx
 ┃ ┣ modal
 ┃ ┃ ┣ Modal.tsx
 ┃ ┃ ┗ modalStyle.tsx
 ┃ ┣ row
 ┃ ┃ ┣ Row.tsx
 ┃ ┃ ┗ rowStyle.tsx
 ┃ ┣ Banner.tsx
 ┃ ┗ Loader.tsx
 ┣ pages
 ┃ ┣ home
 ┃ ┃ ┗ index.tsx
 ┃ ┣ search
 ┃ ┃ ┗ index.tsx
 ┃ ┗ tv
 ┃ ┃ ┗ index.tsx
 ┣ style
 ┃ ┣ GlobalStyle.tsx
 ┃ ┗ media.tsx
 ┣ utils
 ┃ ┣ useCoverPreload.ts
 ┃ ┣ useMediaQuery.ts
 ┃ ┣ useMovieMedia.ts
 ┃ ┣ useWindowDimensions.tsx
 ┃ ┣ useYoutubeTrailer.ts
 ┃ ┗ utils.ts
 ┣ App.tsx
 ┣ Router.tsx
 ┣ main.tsx
 ┣ styled.d.ts
 ┣ theme.ts
 ┗ vite-env.d.ts
```

## 🚀 배포 방법

### 🔹 자동 배포 (권장 방식)

- **Vercel**과 **GitHub 저장소**를 연동하여, main 브랜치에 코드를 push하면 자동으로 CI/CD 파이프라인이 실행됩니다.
- `Preview Deploy`와 `Production Deploy` 환경을 분리 운영
  - **Preview**: Pull Request 또는 브랜치 푸시 시 임시 URL이 생성되어 테스트 및 검증 가능
  - **Production**: main 브랜치에 merge되면 자동으로 프로덕션 도메인에 반영

### 🔹 수동 배포 (CLI)

- Vercel CLI를 이용해 로컬에서 직접 배포할 수 있습니다.

```bash
npm run build
vercel        # Preview 배포
vercel --prod # Production 배포
```

### 🖥️ 로컬 실행 방법

1. 프로젝트 클론 & 의존성 설치

```bash
# 프로젝트 클론
git clone https://github.com/eileen819/newflix.git
cd newflix

# 의존성 설치
npm install
```

2. 개발 서버 실행 (프론트엔드만)

```bash
# Vite 개발 서버 실행
npm run dev
```

3. 프론트엔드 + 서버리스 함수 통합 실행

```bash
# Vercel CLI 설치 (최초 1회)
npm i -g vercel

# 로그인 및 프로젝트 연결
vercel login
vercel link

# Vercel 환경변수 로컬로 가져오기
vercel env pull .env.local

# 프론트 + 서버리스 함수 동시 실행 (프론트와 /api/* 엔드포인트 동작)
vercel dev
```

> API Key는 클라이언트에서 직접 노출하지 않고, 서버리스 함수에서만 사용합니다.

4. 빌드 결과 보기

```bash
npm run build
npm run preview
```

## 🔄 개선 예정 기능 (업데이트 계획)

### 찜 기능

- 좋아하는 콘텐츠를 저장하고 찜 목록에서 모아보기
- Firestore 또는 LocalStorage를 활용한 사용자별 데이터 관리와 개인화 경험 강화

### 검색어 자동완성

- 검색어 입력 시 관련 영화/TV쇼 자동 추천
- 디바운싱 기반 API 호출 최적화 및 사용자 검색 이력 결합

### 리뷰 & 댓글 기능

- 콘텐츠별 리뷰/평점 작성 및 사용자 의견 공유
- 실시간 데이터 연동 및 사용자 인증 시스템 구축 고려

## 📚 기술적 학습 및 인사이트

### 📍 데이터 Fetching & 성능 최적화

- TanStack Query + Axios로 비동기 데이터 처리와 캐싱 전략을 적용하여 API 호출 최소화 & 사용자 대기 시간 단축
- useInfiniteQuery 기반 페이지네이션(더보기 버튼) 패턴을 구현 → 대량 콘텐츠를 점진적으로 처리하는 실무적 접근 경험

### 📍 UI 구성 및 인터랙션

- Swiper로 Netflix-style 대규모 콘텐츠 탐색 UI를 구현하였으며 커스텀 네비게이션 버튼으로 사용자 조작 편의성 강화
- Framer Motion의 layoutId와 variants를 활용하여 자연스러운 모달 전환 & 직관적 hover 인터랙션 제공
- 컴포넌트를 역할 단위로 분리하고 재사용성을 고려한 설계를 경험. 이는 협업 환경에서도 유지보수성과 확장성을 높일 수 있음을 체감

### 📍 Serverless Function 도입

- Vercel Serverless Functions를 통해 TMDB API 프록시 환경을 구성, 클라이언트에서 API Key가 노출되지 않도록 보안 강화
- 이 과정을 통해 실제 서비스에서도 요구되는 API 보안·확장성 패턴을 학습하고 적용 경험을 축적

## 🪪 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
