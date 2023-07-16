# Restaurant List ( AC 3 A3 )

![image](https://raw.githubusercontent.com/muco0521/AC-restaurant-list-Final/main/public/image/restaurant_list_image_5.png)
![image](https://raw.githubusercontent.com/muco0521/AC-restaurant-list-Final/main/public/image/restaurant_list_image_6.png)

## About - 介紹
使用 Node.js + Express + MongoDB 餐廳清單網站。 使用者可以註冊帳號、登入，並查看、新增、編輯或刪除專屬該用戶的餐廳資訊。

## Features - 功能

1. 可以註冊帳號，登入，登出
2. 可以用 Facebook 帳號登入
3. 可以瀏覽使用者專屬的餐廳清單
4. 可以依餐廳名稱、分類使用關鍵字來搜尋
5. 可以查看餐廳的詳細資訊，地址、電話...等等資訊
6. 可以新增餐廳清單
7. 可以編輯餐廳資訊
8. 可以刪除餐廳清單
9. 可以依不同方式排序餐廳清單


## Development Tools - 開發工具

* Node.js
* Express @4.18.2
* Express-handlebars @4.0.2
* MongoDB
* mongoose @5.13.17
* method-override @3.0.0
* express-session @1.17.3
* passport @0.6.0
* passport-facebook @3.0.0
* passport-local @1.0.0
* connect-flash @0.1.1
* bcryptjs @2.4.3

## Installation and execution - 安裝與執行步驟

1.開啟Terminal, Clone此專案至本機:
```
git clone https://github.com/muco0521/AC-restaurant-list-Final.git
```

2.進入專案資料夾，安裝 npm 套件
```
npm install
```

3.安裝 nodemon 
```
npm install nodemon
```

4.設置 .env 檔
填寫`.env.example`所需資料，新增成`.env` 檔案

5.製作種子資料
```
npm run seed
```

6.啟動伺服器
```
npm run dev 
```

7.出現以下字樣表示伺服器連線成功
```
Express is listening on localhost:3000
MongoDB is connect!
```
