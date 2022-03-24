<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/marcosraimondi1/appPlatform">
    <img src="images/favicon.ico" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Multiapp Platform</h3>

  <p align="center">
    This is a webpage where I publish all my projects. Small and big they all deserve a place in the cloud for everyone to visit.
    <br />
    <a href="https://github.com/marcosraimondi1/appPlatform"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://multiapp.my.to">View Demo</a>
    ·
    <a href="https://github.com/marcosraimondi1/appPlatform/issues">Report Bug</a>
    ·
    <a href="https://github.com/marcosraimondi1/appPlatform/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#question-about-the-project">About The Project</a>
      <ul>
        <li><a href="#-built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#checkered_flag-getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites-triangular_flag_on_post">Prerequisites</a></li>
        <li><a href="#installation-wrench">Installation</a></li>
      </ul>
    </li>
    <li><a href="#fire-usage">Usage</a></li>
    <li><a href="#blue_car-roadmap">Roadmap</a></li>
    <li><a href="#two_men_holding_hands-contributing">Contributing</a></li>
    <li><a href="#page_facing_up-license">License</a></li>
    <li><a href="#phone-contact">Contact</a></li>
    <li><a href="#sparkles-acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## :question: About The Project

[![Product Name Screen Shot][product-screenshot]](http://multiapp.my.to)

This is my webpage where I will publish all my projects, served at http://multiapp.my.to with AWS cloud services and docker, currently consists of 4 projects. More details about them down here 👇 👇.

<p align="right">(<a href="#top">back to top</a>)</p>

### ⚙ Built With

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.dev/)
- [Docker](https://docker.com)
- [AWS](https://aws.amazon.com)
- [Puppeteer](https://pptr.dev)
- [youtube-mp3-converter](https://github.com/classicCokie/youtube-mp3-converter)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## :checkered_flag: Getting Started

Try this project online at https://multiapp.my.to . Or clone this project and follow this steps.

### Prerequisites :triangular_flag_on_post:

- npm
  ```sh
  npm install npm@latest -g
  ```
- ffmpeg: if running on windows, you will need the ffmpeg installed, the files are already included in the backend directory so you don't need to worry about it.

### Installation :wrench:

0.  Get your spotify API KEY from https://developer.spotify.com/dashboard/login

1.  Clone the repo
    ```sh
    git clone https://github.com/marcosraimondi1/appPlatform.git
    ```
2.  Install NPM packages both in the frontend and backend directory
    ```sh
    npm install
    ```
3.  Set the environment variables `backend/.env` and `frontend/.env`

    ```sh
     # B A C K E N D    V A R I A B L E S
     NODE_ENV=development

     # A P I
     PORT=5000

     # instagram
     INSTA_USERNAME=`username`
     INSTA_PASSWORD=`password`

     # spotify
     SPOT_CLIENT_ID=`Api Key Here`
     SPOT_CLIENT_SECRET=
     SPOT_REDIRECT_URI=http://127.0.0.1:5000/api/callback # para localhost
     BASE_URL=http://127.0.0.1:5000 # localhost

     # when running in windows
     FFMPEG_PATH=`path to ffmpeg\\bin\\ffmpeg.exe`
     FFPROBE_PATH=`path to ffmpeg\\bin\\ffprobe.exe`

     # youtube
     GAPI_KEY=`youtube api key [optional]`

    ```

    ```sh
    # F R O N T E N D    V A R I A B L E S
    REACT_APP_API_BASE_URL=http://127.0.0.1:5000/api
    ```

4. If running on windows set this line at `backend/api/helper/Spotify/YMP3Converter/youtubeToMp3.js`, so you don't get permission errors:
  ```js
  const savePath = "C:\\Users\\yourUser\\foldertosaveplaylists"; // for windows
  ```

5. All is set up, from cmd run
    ```sh
        # this starts react app
        cd frontend
        npm run start
    ```
    ```sh
        # this starts backend server
        cd backend
        npm run devn
    ```

6. Now you should be able to access the application at your localhost.

7. Optionally you can use docker-compose `docker-compose.yml` to start the project. (Environment Variables are still needed) 

8. Another option is setting up the project using cloud services such us AWS. In that case open the ssh client to your linux machine and copy `installer.sh` bash file. Then execute:

```sh
sudo bash installer.sh
```

This will install all necessary dependencies and packages to get the app running: clone the repo, prompt for the environment variables as well as set up the docker container for you.


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## :fire: Usage

Once you are in the app you can access all my projects. Some such as instagram scraper or spotify playlist downloader.

- Spotify Playlist Downloader:

[![Product Name Screen Shot][product-screenshot2]](http://multiapp.my.to/spotify)

Within this application you will be able to download the songs of any of your own or followed spotify playlists.

  1. First login with your spotify account.

[![Product Name Screen Shot][product-screenshot3]](http://multiapp.my.to/spotify)

  2. Select a playlist and hit the download button. The process will begin and it may take several minutes depending how many songs are there in the playlist.
  
  3. Once the file is ready to download you will see a button as well as a link to visit. Click the button to download the zip file of the playlist into your computer or copy the link into the device you want to download it.

[![Product Name Screen Shot][product-screenshot5]](http://multiapp.my.to/spotify)


- Instagram Follower Scraper:

[![Product Name Screen Shot][product-screenshot1]](http://multiapp.my.to/instagram)


This is an implementation of a python project: [project-repo](https://github.com/marcosraimondi1/Instagram-Scraper) 

  1. Insert your username and click search, this will take some minutes and once finished you should see a json object with information about your followers and followings. 


- Agro CRM: [project-repo](https://github.com/marcosraimondi1/AgroCRM)


- Turnero: [project-repo](https://github.com/marcosraimondi1/turnero)


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## :blue_car: Roadmap

- [x] Build app selector
- [x] Implement Instagram Scraper
- [x] Implement Spotify Playlist Downloader 
  - [x] Spotify API account authentication
  - [x] get youtube songs video ids with puppeteer 
  - [x] use youtube-mp3-converter to download youtube songs
  - [x] compresing .mp3 files to zip
  - [x] downloading .zip feature
- [x] Dockerize project
  - [x] Create docker files for backend and frontend
  - [x] Create docker-compose file to handle frontend and backend
  - [x] Create docker-compose file for production
- [x] Publish project
  - [x] Use AWS Ec2 instance to deploy docker app
  - [x] Create bash files to automate installing and updating the project in the ssh client
- [x] Further optimization improvements to spotify playlist downloader


See the [open issues](https://github.com/marcosraimondi1/appPlatform/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## :two_men_holding_hands: Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## :page_facing_up: License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## :phone: Contact

Marcos Raimondi - [@marcosraimondi](https://www.linkedin.com/in/marcos-raimondi/) - marcosraimondi1@gmail.com

Project Link: [https://github.com/marcosraimondi1/appPlatform](https://github.com/marcosraimondi1/appPlatform)

:globe_with_meridians: https://marcosraimondi1.github.io 

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## :sparkles: Acknowledgments

- [react-json-view](https://www.npmjs.com/package/react-json-view)
- [Unsplash](https://unsplash.com)
- [Material UI](https://mui.com)
- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/marcosraimondi1/appPlatform.svg?style=for-the-badge
[contributors-url]: https://github.com/marcosraimondi1/appPlatform/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/marcosraimondi1/appPlatform.svg?style=for-the-badge
[forks-url]: https://github.com/marcosraimondi1/appPlatform/network/members
[stars-shield]: https://img.shields.io/github/stars/marcosraimondi1/appPlatform.svg?style=for-the-badge
[stars-url]: https://github.com/marcosraimondi1/appPlatform/stargazers
[issues-shield]: https://img.shields.io/github/issues/marcosraimondi1/appPlatform.svg?style=for-the-badge
[issues-url]: https://github.com/marcosraimondi1/appPlatform/issues
[license-shield]: https://img.shields.io/github/license/marcosraimondi1/appPlatform.svg?style=for-the-badge
[license-url]: https://github.com/marcosraimondi1/appPlatform/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/marcos-raimondi
[product-screenshot]: images/screenshot.png
[product-screenshot1]: images/instagram.png
[product-screenshot2]: images/spotify_login.png
[product-screenshot3]: images/spotify_login2.png
[product-screenshot4]: images/spotify_select.png
[product-screenshot5]: images/spotify_download.png
