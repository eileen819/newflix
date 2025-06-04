# 📺 NEWFLIX

사이트 주소와 화면 캡쳐해서 넣기  
🔗 **배포 주소:** [NEWFLIX](배포주소링크)

## 📌 프로젝트 개요

**NEWFLIX**는 최신 영화 및 TV쇼 콘텐츠 정보를 제공하는 웹 어플리케이션입니다.  
Netflix와 유사한 직관적이고 세련된 사용자 경험(UX)을 목표로 설계하여, 사용자가 원하는 콘텐츠를 빠르게 탐색하고 상세 페이지에서 다양한 정보를 확인할 수 있도록 구현했습니다.

본 프로젝트는 React와 Typescript를 중심으로 한 최신 프론트엔드 기술 스택의 학습과 숙련을 목적으로 시작되었습니다. 특히, Framer-motion을 통한 부드러운 애니메이션 효과, Swiper를 이용한 캐러셀 슬라이더 UI 구현, React-Query를 활용한 효율적인 데이터 관리 등을 통해 **실무에 가까운 기술과 기능을 구현하며 개발 역량을 확장**할 수 있었습니다.

또한 TMDB API와의 연동을 통해 최신 영화와 TV쇼 정보를 실시간으로 제공하며, 상세 모달창에서 YouTube 영상을 배경으로 활용하는 등 **다양한 사용자 요구사항과 UX/UI 관점을 적극적으로 반영하여 설계 및 구현한 프로젝트**입니다.

## 💡 주요 기능

### ✅ 최신 영화 및 TV쇼 정보 제공

- TMDB API를 활용해 최신 영화 및 TV쇼 정보를 실시간으로 제공
- 각 콘텐츠 섹션별로 `Swiper` 라이브러리를 활용하여 캐러셀 슬라이더 UI 구현

### ✅ 검색 기능 제공

- 영화와 TV쇼의 통합 검색 기능 제공
- `React-Hook-Form`을 활용한 검색 폼 상태 관리
- `React-Query`와 `Axios`를 활용하여 실시간 검색 결과 제공

### ✅ 모달창으로 영화 및 TV쇼의 상세 정보 제공

- 선택한 영화 또는 TV쇼의 줄거리, 장르, 평점 등의 상세 정보를 모달창에서 제공
- `Framer-motion`을 이용하여 부드럽고 자연스러운 모달 전환 애니메이션 구현
- `React-Youtube` 라이브러리를 활용하여 YouTube 트레일러 영상을 모달창 배경으로 제공 (예고편이 없는 경우, 해당 콘텐츠의 공식 이미지로 대체)

## 🔎 역할과 기여도

- 개인 프로젝트로 기획부터 설계, 개발, 배포까지 **전 과정을 직접 담당**
- 강의를 통해 습득한 기술을 기반으로 추가적인 기능을 직접 개발하여 프로젝트를 확장
- React + TypeScript 기반으로 프로젝트 아키텍처 설계 및 UI 구현
- Framer-motion을 활용한 모달 및 다양한 애니메이션 구현
- Swiper 라이브러리를 활용해 캐러셀 슬라이더 UI 구현
- React-Query 및 Axios를 사용하여 데이터 Fetching 및 캐싱 전략 구현
- Vercel 플랫폼을 이용하여 프로젝트 배포

## 🛠️ 사용한 기술 스택

| 분류                        | 기술                                                |
| --------------------------- | --------------------------------------------------- |
| **Frontend**                | React, Javascript, Typescript, React-Router-Dom     |
| **State & Data fetching**   | React-Query(Tanstack-Query), axios, react-hook-form |
| **Animation & Interaction** | Framer-Motion, React-Youtube                        |
| **UI Components**           | Swiper, react-icons                                 |
| **Styling**                 | Styled-Components, Styled-Reset,                    |
| **API & Data**              | TMDB API                                            |
| **Deployment**              | Vercel                                              |

## 📁 프로젝트 구조

(리팩토링 후에 정리해서 넣기)

## 🚀 배포 방법

- 이 프로젝트는 Vercel을 통해 정적 웹 사이트로 배포됩니다.
- GitHub Repository를 Vercel에 연동하면 자동 배포 가능
- 또는 다음 CLI 명령어를 통해 수동 배포 가능

### 🖥️ 로컬 실행 방법

**프로젝트 클론**

```bash
$ git clone https://github.com/eileen819/newflix.git
$ cd newflix
$ npm install
$ npm start
```

**배포**

```bash
$ npm run build
# Vercel을 이용해 배포 (CLI 또는 웹사이트를 통해 직접 배포 가능)
```

## 🔄 개선 예정 기능 (업데이트 계획)

### ✔️ '찜' 기능 구현

- 사용자가 좋아하는 콘텐츠에 '좋아요'를 누를 수 있음
- '좋아요'를 누른 콘텐츠는 찜 목록으로 분류해서 모아볼 수 있음

### ✔️ 검색어 자동완성(Auto-complete) 기능 구현

- 검색창에 키워드를 입력할 때 자동으로 관련 영화나 TV쇼 이름을 추천해 줄 수 있음

### ✔️ 영화 및 TV쇼 리뷰 및 댓글 기능 추가

- 짧은 리뷰나 평점으로 댓글을 달 수 있도록 구현할 예정
- 여러 사용자에게 해당 콘텐츠에 대한 폭 넓은 정보를 제공할 수 있음

## 📚 기술적 학습 및 인사이트

### 📍 TMDB API를 활용한 데이터 처리

- `React-Query`와 `Axios`를 활용하여 비동기 데이터 Fetching 및 캐싱 적용
- `useInfiniteQuery`를 이용해 무한 스크롤 방식을 구현하며 더 많은 콘텐츠 데이터를 동적으로 불러오는 방식을 경험

### 📍 React Router를 활용한 모달창 관리

- React Router의 `useSearchParams`를 활용하여 URL 쿼리 변경 시 모달창이 자연스럽게 열리고 닫히는 방식으로 설계
- 모달창 상태를 URL로 관리해 사용자의 내비게이션 편의성을 높임

### 📍 Swiper를 활용한 캐러셀 슬라이더 구현

- `Swiper`라이브러리를 이용해 카테고리별 콘텐츠를 캐러셀 슬라이더 UI로 설계해서 제공
- 커스텀 네비게이션 버튼을 구현하여 사용자의 편의성을 높임

### 📍 Framer-motion을 활용한 다양한 애니메이션 구현

- Framer-motion의 `layoutId`를 활용하여 상세 페이지 모달창이 자연스럽게 열리고 닫히는 전환 애니메이션 구현
- 콘텐츠 박스에 `variants`를 활용한 hover 애니메이션을 적용하여 사용자에게 직관적인 인터랙션 피드백을 제공

## 🪪 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
