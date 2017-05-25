# MAY THE FOURTH BE WITH YOU

So the ionic team came up with this amazing event called [Ionic Jedi Hackster](http://blog.ionic.io/become-an-ionic-jedi-hackster/), which aimed at engaging their developers to create a Star Wars themed app in under 48 hours using the latest and greatest [Ionic](https://ionicframework.com) and the recently released [Ionic CLI v3](http://blog.ionic.io/announcing-ionic-cli-v3/).

Of course I had to contribute, to see if I could *become a Jedi Hackster*.

My name is Yann Braga, a passionate fullstack developer based in Fortaleza, Brazil. Today I'll be showing you how StarWarnic was developed.

## The Inspiration
_important note: I do not own any rights to Star Wars brand of imagery, Star Wars was just a theme used for the challenge._

To be honest, I’m not a huge Star Wars fan, but I’ve always had interest in knowing more about its movies. I started thinking in making a card game, where each player would get a set of seven cards and compete statuses with each other. Unfortunately my weekend was rushy, but I still wanted to be able to complete the challenge and make a fun app, so I had to change the initial idea to a very simple app: Listing Star Wars movies and showing some info about them.
One thing I did that was fun (and might confuse people) was listing the movies chronologically with their respective sequence number. This might be weird, as the movies were released in a completely non-ordered sequence: IV, II, I, III, VI, V, VII then VIII.
_Go figure George Lucas’ head_.

When I learned [my app had actually won](http://blog.ionic.io/and-the-1st-ionic-jedi-hackster-is/), I got so excited I decided to improve the project! Even better, turn it into a PWA! Finally, I had a bit more time to actually add some features I wanted:
- Better work on UI
- Enhance support for browser (audio and accelerometer)
- Add a trivia section
- Embed youtube videos in the app
- Integrate the app with firebase and have a real time updated map!
- Publish the app as PWA (Progressive web app)

## Technologies Used:

- [SWAPI (Star wars API)](https://swapi.co/)
- [Ionic 3.3.0](https://github.com/driftyco/ionic)
- [Firebase 3.9](https://firebase.google.com/)
- [Ionic Cache 2.0.1](https://github.com/Nodonisko/ionic-cache)
- [Google Maps API v3](https://developers.google.com/maps/documentation/javascript/)
- [Ionic Native plugins](https://ionicframework.com/docs/native/): Shake, Geolocation, Device, Flashlight, Native Audio, Network
- [Cheerio](https://github.com/cheeriojs/cheerio)

## The App’s Features

- Animated(ish) splash screen
- Custom icons
- Custom side menu transition
- Switching sides (app theme)
- Fetching data
- Sound effects and Jedi Mode
- Overlaying View with Trivia
- Firebase and The Force map
- Publish as PWA

## Animated(ish) Splash Icon

As the app is about Star Wars, it was almost obligatory to have a classic Star Wars intro. Note that this is very experimental, but it was fun to see how it ended up.

Basically, I set the app to not have a splashscreen. Then, added a `div` which contains the Star Wars logo and a background image of a galaxy. On the app start, I show that div and after a few seconds delay, fade it out. To make that logo sliding effect just like the Star Wars movie does, I used css and `@keyframes` animations that would change the logo’s perspective and add a sliding animation, from bottom to top:

https://media.giphy.com/media/DDYYooPOfr5Cw/giphy.gif

To be honest this experience gave me a few issues when in a PWA, as the splash is played every time the user updates the url and it gets a bit annoying. I had to make a few workarounds, so I recommend trying another approach.

## Custom icons

In this project, I added custom icons in order to make it cooler, following the Star Wars theme.

To do so, I downloaded a few SVG icons from [The Noun Project](https://thenounproject.com/)(amazing website, you should definitely check it out) and created my own font by using the online app [Icon Moon](https://icomoon.io/app/).

Right after, I downloaded my custom font and added into the project's assets, then got into the scss and extended the default `ion-icon` so that I could use the same element to either use default icons or my custom icons, such as `<ion-icon name="darth-vader">`.

An example can be seen here:
https://yannbraga.com/static/custom_icons.png

You can check the code out [here](https://github.com/yannbf/may-the-4th/blob/master/src/theme/variables.scss#L76)

## Custom side menu transitions

If you take a closer look at ionic’s [source code](https://github.com/driftyco/ionic/blob/53113366e239a48d83bb70789ed64d0637f150e5/src/components/menu/menu-types.ts), you’ll notice something like this:

```
class MenuRevealType extends MenuType {
  constructor(menu: Menu, plt: Platform) {
    super(plt);

    const openedX = (menu.width() * (menu.isRightSide ? -1 : 1)) + 'px';
    const contentOpen = new Animation(plt, menu.getContentElement());
    contentOpen.fromTo('translateX', '0px', openedX);
    this.ani.add(contentOpen);
  }
}
MenuController.registerType('reveal', MenuRevealType);
```

Did you know this is all the code used to create that sweet slide to reveal animation on the sidemenu? So with the help of [EbilPanda](https://github.com/EbilPanda) I used a similar approach and was able to create this very elegant custom effect:

https://media.giphy.com/media/6C8XLpqQDf8ic/giphy.gif

## Switching side (app theme)

The app offers you the option to be either on the light side or the dark side. Upon picking your side, the whole UI is changed dynamically!

Dynamically switching the app’s theme may seem a bit complicated, but it’s actually quite simple!

This feature can be seen in detail [here](https://github.com/yannbf/ionic3-components/tree/master/src/pages/theming), but I ‘ll try to quickly explain it:

I had to create a `Global State` class, that would share any information across every page whenever needed. This way, I could set info about the theme just like:
```
changeTheme(theme) {
    this.global.set('theme', theme);
}
```

Which could be instantly accessed anywhere with `this.global.get('theme')`.


Then, wrap the whole app in a div such as:
```
<div class="{{global.state['theme']}}">
    // app.html code...
</div>
```

After that, also create as many themes in separate scss files each. For each theme, indicate specific stylings for each element you want to be affected. In this project, I created `theme-darkside.scss` and `theme-lightside.scss`, obviously.

and _boom_, whenever the property ‘theme’ was changed, the whole app’s looks would change instantly!

https://media.giphy.com/media/xUPGcuVozZdmY9WYwg/giphy.gif

_P.S. I have a [Github repository](https://github.com/yannbf/ionic3-components) that has a lot of custom components and samples of many cool stuff, and theme switching is one of them._

## Fetching Data

The SWAPI was used to gather Star Wars specific data, like which characters appear in which movie.

To support faster loading of data and offline support, I used Ionic Cache, a module for request caching which uses Ionic Storage (thus supporting IndexedDB, SQLite and WebSQL). This allowed me to enhance the app's performance as the data would only be fetched remotely once, and later on would be loaded instantly.

I also wanted to have more info about the movies, such as duration, plot, nominations, trivia, etc. To do so, I used the [ODBM (Open Movie Database) API](http://www.omdbapi.com/).
The API is quite good, as it fetches info from IMDb, which is what I wanted. However, a really unexpected thing happened: a few days ago they shut down their open api and only opened for their patreons. It was quite frustrating, but encouraged me to do something way more interesting: get the info myself with a web scraper! It was even better because I also wanted to have a trivia section with lots of interesting facts, and I didn't find any API with this data. To sum up, a web scraper is basically a sort of bot that accesses a web page, extracts its information, and from there you can do whatever you want with it.

In order to populate the movie data, I wrote a [simple web scraper in node](https://github.com/yannbf/imdb-scrapper/blob/master/index.js) that accesses the IMDb url of a given movie and uses [Cheerio](https://github.com/cheeriojs/cheerio) to read the DOM elements just like people are used to do with jQuery selectors. It is as simple as: `$('.movie').text()`. If you never thought of writing a webscrapper, the project can be a good reference, feel free to use it! It's quite fun :)


## Sound effects and Jedi Mode

I was hoping to get some sound effects on the app to make it more fun, and what could be cooler than lightsaber sound effects??

With that in mind, I created a provider that uses Ionic Native Audio plugin to store and play the sounds natively, and also falls back to HTML5 Audio, in case the user is on the browser platform.

https://youtu.be/CG81BrBB1Ag

These sounds would be played in two occasions: When switching sides or when Jedi mode is on.

The Jedi mode is a feature that unfortunately doesn't work on the PWA, but you can check it out by installing the apk/ipa on your app. What it does is it turns your flashlight on with a nice lightsaber sound and every time you swing the phone, the app reproduces a lightsaber swinging sound. This way you can play around and feel like a Jedi!

## Overlaying View with Trivia

Most of you might know about Josh Morony, and as I really like his tutorials I wanted to add some feature from one of his blog posts. I then implemented an adapted version of his sliding drawer, where there is a kind of footer element, but it's actually a whole ion-content that overlays the current view upon clicking:

https://media.giphy.com/media/xUA7aMDSWoOm2G7y7u/giphy.gif

## Firebase and The Force map

This was the feature I most wanted to do. I wanted to have a map that could show all users and which side they are on, so we could see which would prevail.

https://media.giphy.com/media/8SxGru3XzElqg/giphy.gif

To do so, I created a project on firebase and integrated it on the app, and on the maps page I request and register the user information (name and location). Then data is fetched from Firebase database, and each person gets an avatar (all made by [Jory Raphael](http://symbolicons.com/). If you choose the force, you get to be one of the good guys(C-3PO, Princess Leia..), otherwise, one of the bad guys (Darth Vader, Stormtrooper..). Along with that, there are two lightsabers dueling as the number of users grow. This all happens in real time, so you can see the users dropping on the map and the numbers going up.

On this video, I simulated many people registering at the same time for demonstration purposes:

https://media.giphy.com/media/3ohzdWmi3voKoftIZ2/giphy.gif

## Publish as a PWA (Progressive Web App)

A Progressive Web App is a website that behaves just like a native app, and makes it much easier to users access your app without the need of going to the stores and installing your app. They could simply open a url and _boom_, it works.

Fortunately, Ionic supports PWA right out of the box! It offers service workers and a manifest file by default. The service worker is a script that allows PWA functionality such as push notifications, background sync, offline support and much more. The manifest file is processed by the browser and provides metadata such as name, theme, and icon, and enables the browser to add the app to the home screen so that the user can access it later on just like any installed app!

Better yet, if you take a look at `index.html`, there's even a commented code that already does the work of registering the service worker for you: 

```
<!--script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('service worker installed'))
        .catch(err => console.log('Error', err));
    }
</script-->
```

Everything was always there and we never noticed! Just remove the comment and you're good to go. The project uses `sw-toolbox` by chrome, so in case you want to understand what you can do with it, [hit their website](https://googlechrome.github.io/sw-toolbox/).

_Okay, sure.. but how to deploy a production version of my app as PWA?_ 

This is something that I have seen plenty of people asking about on the community and the answer is quite simple: just run `npm run ionic:build --prod` and deploy the generated `/www` folder!

https://media0.giphy.com/media/11sBLVxNs7v6WA/giphy.gif

_Sure, but what are the steps of deploying a PWA?_
Well, there are a few ways you can achieve it: you could either host your app in your private server or use Firebase hosting services. Firebase offers free hosting, which makes interesting if you are just trying stuff out. It's also really quick from setup to deploy, like a matter of a few minutes. There is a great [step by step guide](https://firebase.google.com/docs/hosting/deploying) on their website.

*Important note!*

Nowadays every website is being served over https protocol, so there's a great secure layer that protects the privacy and integrity of the website's data whilst securing the website from upcoming attacks. This means that every request in the app has to be done through *https*, otherwise it will be flagged as non-secure and therefore get canceled. SWAPI is great but gave me a few headaches because of that. As their docs doesn't mention https, I was unsure if they supported it. Even though I had renamed my request url to https (such as `https://swapi.co/api/people/1`), the calls were being redirected as http. After a few good hours the problem was solved in an unexpected way: I just had to add a slash to the end of every request ¯\_(ツ)_/¯.

## May the force be with ALL of us

I was really flattered to have won the challenge but I'm even more grateful to have the opportunity to share my experience with you all. Ionic is an amazing and versatile platform that has given me many wonderful opportunities ever since the first day I started using it (it was still ionic 2 beta!).

I wish this was interesting and brought inspiration to you! If you are interested in knowing more about this project, have any questions or just want to chat, feel free to hit me on [Ionic's worldwide slack](https://ionicworldwide.herokuapp.com/) or contact me through [my website](https://yannbraga.com/).

Without further do, you can access the app on https://maythe4th.yannbraga.com, or on Ionic View with id 6e8bd472, or even building the app yourself on the repository: https://github.com/yannbf/may-the-4th.

Let's see which side will win! What side are you on?
_spoiler: The one I chose offered me cookies_.
