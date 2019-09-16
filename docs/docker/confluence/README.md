# confluence & postgresql
使用docker 部署nginx
## 路径约定

## 创建目录
```bash

```
## docker-compose.yml
```bash

version: '3.4'
services:
  confluence:
    image: cptactionhank/atlassian-confluence:6.15.8
    container_name: confluence
    ports:
      - "8090:8090"
      - "8091:8091"
    restart: always
    depends_on:
      - db
    volumes:
      - ./confluence/logs:/opt/atlassian/confluence/logs
      - ./confluence/confluence-data:/var/atlassian/confluence
  db:
    image: postgres:9.4
    container_name: confluence-db
    ports:
      - "5432:5432"
    restart: always
    environment:
      - 'POSTGRES_USER=confluencedb'
      # CHANGE THE PASSWORD!
      - 'POSTGRES_PASSWORD=smart360@zxmm'
      - 'POSTGRES_DB=confluencedb'
      - 'POSTGRES_ENCODING=UTF8'
      - 'POSTGRES_COLLATE=C'
      - 'POSTGRES_COLLATE_TYPE=C'
    volumes:
      - ./confluence/pgsql-data:/var/lib/postgresql/data
```
