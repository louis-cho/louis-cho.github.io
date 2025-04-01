---
title: GitHub Pages + Jekyll + TeXt 테마로 블로그 만들기
tags: GitHub Jekyll TeXt 블로그
---

## 들어가기 전에

- **GitHub Pages란?**  
  GitHub 저장소의 정적 파일(HTML, CSS, JS 등)을 웹사이트로 호스팅해주는 기능입니다. 별도 서버 없이 블로그 운영 가능하다는 장점이 있습니다.

- **Jekyll이란?**  
  정적 사이트 생성기로, 마크다운 파일을 HTML로 변환해주는 도구입니다. GitHub Pages와 완벽하게 연동됩니다.

- **TeXt 테마의 특징**  
  미니멀하고 기능적인 Jekyll 테마로, 태그, 카테고리, 다크모드, 반응형 등 다양한 기능을 기본 탑재하고 있습니다.

---

## ✅ 1. 블로그 테마 찾기

- [https://jekyllthemes.org/](https://jekyllthemes.org/) 에서 원하는 테마 찾기
- 데모 사이트를 통해 미리보기 가능
- 예제는 [`jekyll-TeXt-theme`](https://github.com/kitian616/jekyll-TeXt-theme) 테마로 진행

---

## ✅ 2. 테마 클론 및 디렉터리 설정

```bash
git clone https://github.com/kitian616/jekyll-TeXt-theme [BLOG_DIRECTORY]
cd [BLOG_DIRECTORY]
```

---

## ✅ 3. 기존 Git 이력 삭제

```bash
rm -d .git
```

---

## ✅ 4. GitHub 저장소 생성

GitHub에서 `[사용자명].github.io` 형태로 저장소를 생성합니다.
  - ex) `louis-cho.github.io`

---

## ✅ 5. 저장소 연결 및 초기 커밋

```bash
git init
git remote add origin https://github.com/[USERNAME]/[USERNAME].github.io
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

## ✅ 6. GitHub Pages 설정

- GitHub 저장소 > **Settings > Pages** 로 이동
- **Build and deployment** 설정:
  - **Source**: `Deploy from a branch`
  - **Branch**: `main`
  - **Folder**: `/ (root)`

`https://[USERNAME].github.io` 주소에서 블로그 확인

---

## ☑️ 추가 설정 및 커스터마이징

- 빠른 시작 가이드:  
  [Quick Start](https://kitian616.github.io/jekyll-TeXt-theme/docs/en/quick-start)

- 설정 문서:  
  [Configuration Guide](https://kitian616.github.io/jekyll-TeXt-theme/docs/en/configuration)

- GitHub Actions를 이용한 자동 배포:  
  * Settings > Pages > Build and deployment > **Source: GitHub Actions**

---

## ☑️ GitHub Actions란?

**GitHub Actions**는 GitHub에서 제공하는 CI/CD 플랫폼으로, 코드 변경이 발생했을 때 자동으로 빌드, 테스트, 배포 등의 작업을 실행할 수 있습니다.  
Jekyll 블로그의 경우에도 GitHub Actions를 활용해 `main` 브랜치에 푸시할 때마다 자동으로 블로그를 빌드하고 GitHub Pages에 배포할 수 있습니다.

---

## ☑️ GitHub Actions 설정 예시

`.github/workflows/github-pages.yml` 파일을 생성 후 아래 내용을 추가하기:

```yaml
# 워크플로 이름
name: Deploy Jekyll site to GitHub Pages

# main 브랜치에 push 될 때 워크플로 실행
on:
  push:
    branches:
      - main  # main 브랜치에 push 이벤트 발생 시 실행

# GitHub Pages에 배포하기 위한 권한 설정
permissions:
  contents: read     # 소스 코드 읽기 권한
  pages: write       # GitHub Pages 쓰기 권한
  id-token: write    # OIDC 토큰 발급 (GitHub Pages 배포 인증용)

# job (build-deploy, deploy) 정의
jobs:
  # Jekyll 사이트를 만들어서, 배포 준비까지 수행
  build-deploy:
    runs-on: ubuntu-latest  # 최신 우분투 환경에서 실행

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4  # 저장소 코드를 워크플로 환경으로 체크아웃

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'       # 사용할 Ruby 버전 (Jekyll 호환 버전)
          bundler-cache: true       # bundler 의존성 캐싱 (빌드 속도 향상)

      - name: Install dependencies
        run: |
          bundle install            # Gemfile에 정의된 루비 의존성 설치

      - name: Build site with Jekyll
        run: |
          bundle exec jekyll build # Jekyll로 정적 사이트 빌드 (_site 디렉터리 생성)

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./_site             # GitHub Pages로 업로드할 빌드 결과물 위치

  # 빌드 후에 실제 GitHub Pages에 배포하는 단계
  deploy:
    needs: build-deploy            # 이전 잡(build-deploy)이 성공해야 실행됨
    runs-on: ubuntu-latest         # 최신 우분투 환경에서 실행
    environment:
      name: github-pages           # GitHub Pages 환경 이름
      url: ${{ steps.deployment.outputs.page_url }} # 배포된 페이지 URL 표시용
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2  # GitHub 공식 배포 액션 사용
```

---