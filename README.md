#HOW ABOUT OOTD
<p align="center">
  <br>
  <img src="./client/public/readme.png">
  <br>
</p>

# 배포 주소
https://haoshop.site

# 사용 기술
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

# AWS EC2(UBUNTU) 배포

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