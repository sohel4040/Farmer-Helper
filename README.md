# Farmer Helper

## Installation and Setup

1. Clone the repository

   ```bash
   git clone ﻿https://github.com/sohel4040/Farmer-Helper.git 
   ```

   ```bash
   cd Farmer-Helper
   ```


2. Open terminal and type following command

   ```bash
    docker-compose up --build
   ```
3. Open another terminal, and type following once the 'Attaching to farmer-helper' message is displayed after executing first command

   ```bash
    docker exec -it farmer-helper bash
   ```
   
4. The bash for root user will be opened after running above command. Type following command in bash

   ```bash
    npx expo login
   ```

Once you are logged in, You can test your application using expo go.

You don’t need to rebuild every time—once the image is built, just start the container with:

   ```bash
    docker-compose up
   ```

NOTE : Your mobile and computer must be connected to the same WiFI or network

