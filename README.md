# HOW ABOUT OOTD 
<p align="center">
  <br>
  <img src="./client/public/readme.png">
  <br>
</p>

## 프로젝트 소개
- 컨셉
  - OOTD란 ‘오늘 입은 옷차림’, ‘오늘의 패션’(Outfit Of The Day)의 준말로,
    당일 또는 특정 상황에서 입은 자신의 옷차림을 촬영하여 소셜미디어 등에 업로드하는 행위를 가리킨다는 뜻으로
    ‘HOW ABOUT OOTD’는 사용자에게 다양한 브랜드와 데일리룩을 추천하고 의류를 판매하는 쇼핑몰
- 프로젝트 인원: 2명
- 프로젝트 기간: 2022.05.27(금) ~ 2022.07.25(월) / 2달
- 역할: 프론트엔드 및 UI 개발

## 배포 주소
  - https://haoshop.site
  - 테스트 ID: await@gmail.com / PW: 123456
  - 테스트 카드: 4242-4242-4242-4242

## 사용 기술
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

## 배운 점
### 1. 트렌디한 기술 활용
  - 학원 수료하고 추가적으로 공부하여 JSP에서 REACT로, CSS에서 SCSS로, CSS 속성인 FLOAT에서 FLEX, GRID를 사용해서 이번 프로젝트에 좀 더 트렌디한 기술들을 프로젝트에 적용함.
### 2. 상태 관리
  - Redux Toolkit을 이용해서 하나의 Store를 가지고 상태를 효율적으로 관리함.
  - Slice로 백엔드에 API 요청을 통해 상태를 관리하는 것을 직접 만들면서 그 흐름을 이해할 수 있었음.
  - 다음 프로젝트 시에 상태 관리로 react query도 활용해 볼 예정.
  - 하지만 React가 단방향으로 상태를 관리하다보니 코드의 줄이 길어지는 느낌을 받음.
### 3. 트리 구조 알고리즘
  - 쇼핑 페이지의 카테고리 같은 경우 카테고리가 무한정으로 늘어날 수 있도록 트리 구조 알고리즘 형태로 만들어져 있음.
  - 이 때, 라이브러리를 이용하지 않고 직접 트리 구조 형태의 컴포넌트를 만들어서 컴포넌트를 재사용할 수 있도록 설정함.

## 아쉬운 점
### 1. 컴포넌트 세분화
  - 리액트의 장점이 컴포넌트 재사용이지만 이를 적극적으로 활용하지 못했던 것 같음.
  - 다음에는 SASS에서 styled-component나 emotion을 활용해서 컴포넌트를 모아두는 파일을 만들고 UI를 만들어볼 예정.
### 2. LOADING 시 화면 표시
  - CSR은 로딩창을 받아오는 과정이 짧기 때문에 로딩창을 먼저 보여줄 수 있음.
  - 데이터를 가져오는 동안에 사용자에게 알릴 Loading 컴포넌트를 만들기만 하고 기간에 쫓겨 만들다보니 제대로 적용하지 못했음. 
### 3. SSR 활용
  - 쇼핑몰 페이지를 CSR로 만들면서 느낀 점이 렌더링하는데 있어
    로그인, 컨택트, 상품 상세 페이지와 같이 상품 등록 후 크게 바뀔 일 없는 경우 등에 SSR로 만드는 것이 좀 더 속도도 빠르고 효율적이라고 생각하게 됨.
  - CSR로만 만들면 검색엔진이 방문했을 때 로딩창밖에 없기 때문에 아무런 컨텐츠가 없다고 판단할 수 있기 때문에 SSR을 지원해주는  Next로 사용자 페이지를 만들어보고 싶음.
### 3. Typescript
  - product, checkout 페이지에 보면 qty, usedPoint로 각각 수량이나 포인트를 작성하는 input 태그가 있음.
  - 이 때, 숫자를 작성하고 카트에 담거나 결제를 하면 console에 찍힌 값이 String이지만 그대로 데이터가 넘어가버림.
  - Javascript가 타입이 없어 이를 억지로 실행하고 값이 이상하게 넘어가는 것을 확인할 수 있었음.
  - 데이터가 이상하게 넘어가기 전에 Typescript를 사용해서 타입을 정해줘 이런 실수를 방지하면 좋을 것 같다고 생각함.

## AWS EC2(UBUNTU) 배포

### 1. 보안 그룹 설정
```
- HTTP(PORT 80)
- HTTPS(PORT 443)
- CUSTOM TCP(PORT 27017 : MONGODB)
- CUSTOM TCP(PORT 8000 : BACKEND SERVER)
- CUSTOM TCP(PORT 8800 : SOCKET SERVER)
```
### 2. 접속
```
ssh -i [Keypair file] ubuntu@[PublicDNS]

pem file permisson 변경 : chmod 600 ./shop_keypair.pem
```

### 3. 접속 후
```
sudo apt update && sudo apt upgrade -y

mkdir apps

cd apps

git clone [깃주소]
```

### 4. Node 설치
```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

sudo apt-get install -y nodejs
```

### 5. backend, socket
```
npm install
```

### 6. pm2 설치
```
sudo npm install pm2 -g

pm2 start apps/haoshop/socket/index.js

pm2 start apps/haoshop/backend/server.js

sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

pm2 save
```

- pm2 명령어
  - pm2 start apps/haoshop/backend/server.js --name [name입력]
  - pm2 stop 0[id or name]
  - pm2 delete [id or name]
  - pm2 status

- startup Setting(서버 재부팅시 startup setting 자동 재설정)
  - sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

### 7. client
```
cd apps/haoshop/client

sudo npm install

npm run build
```
- build 내의 index.html로 Nginx 경로 설정

### 8. nginx 설치
```
sudo apt install nginx -y
```

- nginx 명령어
  - systemctl status nginx.service
  - sudo systemctl status nginx
  - sudo systemctl enable nginx
  - sudo systemctl restart nginx
  - sudo systemctl stop nginx

### 9. /etc/nginx/sites-available 설정
- file하나 만들자
- default 수정 또는 복사하여 새로 생성
```
cd /etc/nginx 
cd sites-available
sudo cp default shop
sudo vi shop
```
- sites-available 설정
```
server {
        listen 80;
        listen [::]:80;

        root /home/ubuntu/apps/haoshop/client/build;

        index index.html;

        server_name www.haoshop.site haoshop.site 43.200.176.59;

        location / {
                try_files $uri /index.html;
                error_page 405 = $uri;
        }

         location /api {
            proxy_pass http://localhost:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

          location /public {
            proxy_pass http://localhost:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /socket.io {
          proxy_pass http://localhost:8800/socket.io;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "Upgrade";
          proxy_set_header Host $host;
        }
}
```

### 11.  /etc/nginx/sites-enabled   
- Enable the new site
```
- sudo ln -s /etc/nginx/sites-available/shop /etc/nginx/sites-enabled/
- sudo systemctl restart nginx
- systemctl status nginx.service
```

### 12. sites-available, sites-enabled의 default 파일 삭제
- 각 폴더에서
```
sudo rm default
```

### 13. ENV 관리
* env 폴더 최상단에서 관리하는 것이 좋다
* 개별 env 설정 방법
  - export TEST="hello" 세팅 끝
  - printenv
  - printenv | grep -i test
  - unset TEST


* env 파일 생성으로 한번에 적용
```
sudo vi .env
* env변수들 붙여넣기 *
set -o allexport; source /home/ubuntu/.env; set +o allexport
printenv
```

- ls -la(숨김파일보기)
- .profile 에서 env변수 reboot시에도 항상 적용되게 설정
```
- vi .profile
- set -o allexport; source /home/ubuntu/.env; set +o allexport 
```

### 14. nginx 권한 해결
```
vi /etc/nginx/nginx.conf 
```

 - /etc/nginx/nginx.conf 에서 유저 권한 변경
```
#user www-data;
user root;
```
- 수정 후 리스타트: sudo systemctl restart nginx

### 15. Enable Firewall
```
sudo ufw status
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status
```

### 16. https lets encrypt with certbot
```
sudo snap install core; sudo snap refresh core
sudo apt remove certbot
sudo snap install --classic certbot
```

- Prepare the Certbot command
```
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```
- Get and install certificates using interactive prompt
```
sudo certbot --nginx
```
- 이후 절차따라 실행하면 https 설정 완료

- https 설정 완료된 sites-availalbe 설정은 다음과 같은 형태
```
server {
        listen 80;
        listen [::]:80;

        root /home/ubuntu/apps/haoshop/client/build;

        index index.html;

        server_name www.haoshop.site haoshop.site 43.200.176.59;

        location / {
                try_files $uri /index.html;
                error_page 405 = $uri;
        }

         location /api {
            proxy_pass http://localhost:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

          location /public {
            proxy_pass http://localhost:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /socket.io {
          proxy_pass http://localhost:8800/socket.io;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "Upgrade";
          proxy_set_header Host $host;
        }
}
```


### 17. 에러 로그 확인
cat /var/log/nginx/error.log


-------------------------------------------------------------------
### 기타) Linux 명령어 모음

- vi editor(vim)
```
sudo apt-get install vim

***************************************************
i) command mode 에서의 명령어들
입력모드 -i
입력모드 -a
왼쪽이동 -h
아래이동 -j
위로이동 -k
오른쪽  -l
( -현재 문장의 처음
( - 현재 문장의 끝
{ - 현재 문단의 처음
} - 현재 문단의 끝
한글자삭제 -x
한단어 삭제 -dw
한줄삭제 -dd
n번째 줄 삭제 -ndd
현재줄 복사 -yy
n번째 줄 복사 -nyy
붙여넣기 -p
undo - u

***************************************************
ii) 마지막 행 모드(last line mode)에서의 명령어들
    esc 누르고, 콜론( : )을 누르면 나오는 상태 명령 후 ENTER
    
종료 :q   q!
저장 :w   w[파일명]
저장후종료 :wq   wq!
파일명 변경: f [파일명]
```

- cat: 파일 표준출력(concatenate)
```
cat [OPTION]... [FILE]...
    OPTION
      -n        : 모든 라인 앞에 라인 번호 출력. (빈 라인도 번호 출력)
      -b        : 비어 있지 않은 라인에만 번호 출력.
      -E        : 라인의 마지막에 $ 기호 출력. (빈 라인도 $ 기호 출력)
      -T        : 탭 문자를 ^I로 바꿔서 출력.
      -s        : 두 번 이상 연속된 빈 라인(empty line) 출력 안함.
      -v        : 탭(TAB)과 줄바꿈(LFD)을 제외한 nonprinting 문자를 ^, M-를 사용하여 표시.
      -e        : -vE와 결과 같음. 줄바꿈(LFD)을 포함한 nonprinting 문자 표시.
      -t        : -vT와 결과 같음. 탭(TAB)을 포함한 nonprinting 문자 표시.
      -A        : -vET와 같음. 탭(TAB), 줄바꿈(LFD)을 포함한 nonprinting 문자 표시.
```