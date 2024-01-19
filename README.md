## Dependencies used in this project 

```bash
# don't run this command
npm install express cookie-parser morgan dotenv bcryptjs jsonwebtoken
npm install prisma --save-dev
npm install brcypt
npm install joi
npm install --save-dev @types/express
npm install winston
npm install --save-dev @types/bcrypt
npm install --save-dev jest @types/jest
npm install --save-dev babel-jest @babel/preset-env
npm install --save-dev supertest @types/supertest
```

## Run this DDL in your database
```sql
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoD
```

## Run this command in terminal 

```bash
# copy .env.example to .env 
# set your database credentials inside env file
# run command bellow
npm install 
npx prisma generate
```