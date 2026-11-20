# KAFV 인터랙티브 특강교재 · PWA 배포 패키지

이 패키지는 기존 PASS/LOCK `index.html`의 0·1·2단계 원본과 PC/모바일 PDF 열람 기능을 보존하면서 모바일 홈 화면용 아이콘·설치·시작 이미지를 추가했습니다.

## GitHub Pages 배포
1. 이 압축 파일을 **압축 해제**합니다. ZIP을 통째로 업로드하면 실행되지 않습니다.
2. `index.html`, `manifest.webmanifest`, `sw.js`, `assets/` 폴더를 **기존 GitHub 저장소의 index.html이 있는 같은 위치**에 업로드합니다. 폴더 이름을 더 만들지 마세요.
3. Commit 후 기존 GitHub Pages 주소에서 새로고침합니다.
4. Android에서는 Chrome의 앱 설치(또는 홈 화면에 추가) 또는 교재 상단 `앱 설치`를 이용합니다. iPhone은 Safari의 공유 → 홈 화면에 추가입니다.
5. 기존 홈 화면 바로가기 아이콘이 바뀌지 않으면 **이전 바로가기를 삭제한 뒤 다시 추가**해야 할 수 있습니다.

## 검수 범위 및 한계
- GitHub Pages 하위 경로에서도 작동하도록 전부 상대 URL로 연결했습니다.
- 서비스 워커는 통합교재와 로컬 아이콘·시작 이미지에만 대응합니다. Cloudflare R2 PDF/API 및 외부 PDF.js CDN은 캐시하지 않습니다. **온라인 PDF 열람에는 인터넷이 필요합니다.**
- 브라우저와 OS에 따라 설치 방식과 네이티브 시작 화면 표시는 다릅니다. 별도 시작 이미지는 설치된 앱을 모바일에서 열었을 때 잠깐 표시됩니다.
- 소장님의 실제 모바일/PC 배포 확인 후 최종 PASS/LOCK을 판정합니다.

## 파일
- `index.html`: 기존 통합교재 + PWA 참조 및 설치 안내/시작 화면
- `manifest.webmanifest`: 앱 이름, 192/512 아이콘, 설치 모드
- `sw.js`: 앱 자원 캐시 및 네트워크 우선 갱신
- `assets/icon-192.png`, `assets/icon-512.png`: 설치 아이콘
- `assets/icon-maskable-512.png`: Android 적응형 아이콘용
- `assets/apple-touch-icon.png`: iOS 홈 화면 아이콘
- `assets/favicon-32.png`: 브라우저 탭 아이콘
- `assets/splash-portrait.png`: 모바일 실행 시작 화면
