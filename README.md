# vuecli-electron

간단한 Echo socket server와 연결하여 기본적인 electron app + vue의 통신을 구현한다.   
소켓을 제외하고 대략적인 앱 구성만 참조해도 된다.   
기존에 만든 electron-notification-sample을 구성 업그레이드 한 버전이다.   

- vue3
- vue-cli
- electron
- electron-builder

#### 기타 정보
.env.production -> .env로 복사하여 환경에 맞는 socket 서버를 넣어준다.    
*Render(Vuejs)*의 실행 메인은 `main.js` 이고,   
*Main(Electron)*의 실행 메인은 `background.js` 이다.   

#### 설치
```
npm install
```

#### Vue 파일만 데브환경 실행
```
npm run serve
```

#### Electron App 데브환경 실행
```
npm run electron:seve
```

#### Electron App 빌드
```
npm run electron:build
```

#### Ref
See [vue-cli electron](https://nklayman.github.io/vue-cli-plugin-electron-builder/).
