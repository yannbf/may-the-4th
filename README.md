# MAY THE FOURTH BE WITH YOU

So the ionic team came up with this amazing event called [Ionic Jedi Hackster](http://blog.ionic.io/become-an-ionic-jedi-hackster/), which aimed at engaging their developers to create a Star Wars themed app in under 48 hours using the latest and greatest [Ionic](https://ionicframework.com) and the recently released [Ionic CLI v3](http://blog.ionic.io/announcing-ionic-cli-v3/).

Of course I had to contribute, to see if I could become a *Jedi Hackster*.

## The Inspiration

To be honest, I’m not a huge Star Wars fan, but I’ve always had interest in knowing more about its movies. I started thinking in making a card game, where each player would get a set of seven cards and compete statuses with each other. Unfortunately my weekend was rushy, but I still wanted to be able to complete the challenge and make a fun app, so I had to change the initial idea to a very simple app that gathered info about the Star Wars movies. One thing I did that was fun (and might confuse people) is I listed the movies chronologically with their respective sequence number. This might be weird, as the movies’ sequence order was completely unordered in relation to their chronological release time: IV, II, I, III, VI, V VII then VIII.
_Go figure George Lucas’ head_.

When I learned I my app had actually won, I got so excited I decided to improve the project! Finally I had a bit more time to actually add some features I wanted:
- Better work on UI
- Enhance support for browser (audio and accelerometer)
- Integrate the app with firebase and have a real time updated map!

## Technologies Uused:

- [SWAPI (Star wars API)](https://swapi.co/)
- [ODBM (Open Movie Database) API](http://www.omdbapi.com/)
- [Ionic 3.2.1](https://github.com/driftyco/ionic)
- [Firebase 3.9](://firebase.google.com/)
- [Ionic Cache](https://github.com/Nodonisko/ionic-cache)
- [Google Maps API v3](https://developers.google.com/maps/documentation/javascript/)
- [Ionic Native plugins](https://ionicframework.com/docs/native/): Shake, Geolocation, Device, Flashlight, Native Audio, Network

## The App’s Features

- Animated(ish) Splash Screen
- Custom icons
- Custom sidemenu transition
- Switching sides (app theme)
- Fetching data
- Sound effects and Jedi Mode
- Firebasea and The Force map

## Animated(ish) Splash Icon

As the app was about Star Wars, it was almost obligatory to have a Star Wars intro. Note that this is very experimental, but it was fun to see how it ended up.

Basically, I set the app to not have a splashscreen. Then, added a `div` which would contain the star was logo and a background image of a galaxy. On the app start, I would show that div and after a few seconds delay, fade it out. To make that logo sliding effect just like the Star Wars movie does, I used css and `@keyframes` animations that would change the logo’s perspective and add a sliding animation, from bottom to top.

[INSERT ANIMATION GIF HERE]

## Custom icons

In this project I added custom icons in order to make it cooler, following the Star Wars theme.

To do so, I downloaded a few svg icons from [The Noun Project](https://thenounproject.com/)(amazing website, you should definitely check it out) and created my own font by using the online app [Icon Moon](https://icomoon.io/app/).

Right after, I downloaded my custom font and added into the projects assets, then got into the scss and extended the default `ion-icon` so that I could use the same element to either use default icons or my custom icons, such as `<ion-icon name="darth-vader">`.

You can check the code out [here](https://github.com/yannbf/may-the-4th/blob/master/src/theme/variables.scss#L76)

## Custom sidemenu transitions

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

Did you know this is all the code to create that sweet slide to reveal animation on the sidemenu? So with the help of [EbilPanda](https://github.com/EbilPanda) I used a similar approach and was able to create this very elegant custom effect:

[ SIDEMENU EFFECT GIF ]

## Switching side (app theme)

The app offers you the option to be either on the light side or the dark side. Upon picking your side, the whole UI is changed dinamically!

https://media.giphy.com/media/8SxGru3XzElqg/giphy.gif

Dinamically switching the app’s theme may seem a bit complicated, but it’s actually quite simple!

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

[ INSERT SWITCHING THEME GIF ]

_P.S. I have a [Github repository](https://github.com/yannbf/ionic3-components) that has a lot of custom components and samples of many cool stuff, and theme switching is one of them._

## Fetching Data

The SWAPI was used to gather the Star Wars data.

I also wanted to have more info about the movies, like duration, plot, nominations, etc. To do so, I used the OMDB API.

To support faster loading of data and offline support, I used Ionic Cache, a module for request caching which uses Ionic Storage (thus supporting IndexedDB, SQLite and WebSQL). This allowed me to enhance the app's performance as the data would only be fetched remotely once and later on would be loaded instantly.

## Sound effects and Jedi Mode

I was hoping to get some sound effects on the app to make it more fun, and what could be cooler than lightsaber sound effects??

With that in mind, I created a provider that uses Ionic Native Audio plugin to store and play the sounds natively, and also falls back to HTML5 Audio, in case the user is on the browser.

These sounds would be played in two ocasions: When switching sides or when Jedi Mode is on.

## Firebase and The Force map

This was the feature I most wanted to do. I wanted to have a map that could show all users and which side they had chosen, so we could see which would prevail.

To do so, I created a project on firebase and integrated it with the app, and on the maps page I request and register the user name and location. Then data is fetched from firebase database, and each person gets an avatar. If you choose the force, you get to be one of the good guys(C-3PO, Princess Leia..), otherwise, one of the bad guys (Darth Vader, Stormtrooper..)