# Vidalog

## Introduce
인생(vida)을 기록(log)하는 웹 서비스  
<sup>2021. 06. 30. ~ 2021. 09. 01.</sup>   

GitHub 잔디 달력과 [인스타그램의 스토리 달력](https://github.com/ChoiYongWon/vidalog-serverless-client/assets/40623433/5cdba8bc-4b5b-4621-96aa-d04844bcc152)을 보면서 매우 직관적이라는 느낌을 받았습니다. 이 두 가지를 결합하여 제공하면 어떨까 하는 생각이 들어 프로젝트를 시작하게 되었습니다.

[WEBSITE](https://master.d35jqv8wcjjd06.amplifyapp.com)  

_해당 프로젝트는 두 가지 버전으로 나뉘며, 각 버전마다 프론트엔드(FE)와 백엔드(BE) 저장소가 존재합니다. 따라서 총 4개의 저장소가 있습니다._

| type  | FE | BE |
| ------------- | ------------- | ------------- |
| vidalog-docker-xxxx  | [vidalog-docker-client](https://github.com/ChoiYongWon/vidalog-docker-client)  | [vidalog-docker-server](https://github.com/ChoiYongWon/vidalog-serverless-client) |
| vidalog-serverless-xxxx  | [vidalog-serverless-client](https://github.com/ChoiYongWon/vidalog-serverless-client)  | [vidalog-serverless-server](https://github.com/ChoiYongWon/vidalog-serverless-server) |


### 1. vidalog-docker-xxxx
   
   초기에 EC2에 Docker로 FE와 BE를 동시에 배포한 버전입니다.  
   배포 자동화는 CircleCI를 통해 구축했습니다.

   ![vidalog docker 인프라](https://github.com/ChoiYongWon/vidalog-serverless-client/assets/40623433/75c29854-d7de-497b-9caf-d4b61b12c6b5)

  
### 2. vidalog-serverless-xxxx
   
   1번 방법에서 EC2의 비용이 부담되어, BE는 serverless로 aws lambda에, FE는 aws amplify로 배포한 버전입니다.

   ![Slide 16_9 - 1](https://github.com/ChoiYongWon/vidalog-serverless-client/assets/40623433/a68a0b75-7237-45b5-9627-872e2e343081)

## Tech Stack
### Frontend
- React
- Recoil
- Styled-Components

### Backend
- NestJS
- TypeORM

## View

### 로그인
![image](https://user-images.githubusercontent.com/40623433/187840675-f16c588a-0c8e-42a7-91f7-6261b4582901.png)

### 메인
![image](https://user-images.githubusercontent.com/40623433/187840775-dead9c30-d708-4934-80f4-336a5dd68cbe.png)

### 업로드
![image](https://user-images.githubusercontent.com/40623433/187841606-7583dab6-b139-4d27-939a-5ddf8d193da5.png)

### 게시물
![image](https://user-images.githubusercontent.com/40623433/187841938-e896d517-3e0a-4836-b7d3-884c434fb262.png)
