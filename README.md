# MAY THE FOURTH BE WITH YOU

So the ionic team came up with this amazing event called [Ionic Jedi Hackster](http://blog.ionic.io/become-an-ionic-jedi-hackster/), which was aiming developers to create a Star Wars themed app in under 48 hours using the latest and greatest ionic and the recently released [Ionic CLI v3](http://blog.ionic.io/announcing-ionic-cli-v3/).

Of course I had to make my contribution and see if I could become a Jedi Hackster.

## The inspiration

To be honest I'm not a star wars huuge fan myself, but I've always had interest in knowing more about its movies. I started thinking in making a card game, where each player would get a set of seven cards and compete statuses with each other. Unfortunately my weekend was rushy, but I still wanted to be able to complete the challenge and make a fun app, so I had to change the initial idea to a very simple app that gathered info about the star wars movies.

I ended up winning the challenge! I got so excited I had to improve the project.

## Technologies used:

- SWAPI (Star wars API)
- Ionic 3.2.1
- Firebase 3.9
- Ionic Cache
- Google Maps API v3
- Ionic Native plugins (Shake, Geolocation, Device, Flashlight, Native Audio, Network)

## The App's Features

- Animated(ish) Splash Screen
- Custom icons
- Custom sidemenu transition
- Switching sides (app theme)
- Fetching data
- The Force map
- Jedi Mode

## Animated(ish) Splash Icon

_Talk about how it was done_

## Custom icons

In this project I added custom icons in order to make it cooler, following the star wars theme.

To do so, I downloaded a few svg icons from [The Noun Project](https://thenounproject.com/)(amazing website, you should definitely check it out) and created my own font by using the online app [Icon Moon](https://icomoon.io/app/).

Right after, I downloaded my custom font and added into the projects assets, then got into the scss and extended the default `ion-icon` so that I could use the same element to either use default icons or my custom icons, such as `<ion-icon name="darth-vader">`.

You can check the code out [here](https://github.com/yannbf/may-the-4th/blob/master/src/theme/variables.scss#L76)

## Custom sidemenu transitions

If you take a closer look at ionic's [source code](https://github.com/driftyco/ionic/blob/53113366e239a48d83bb70789ed64d0637f150e5/src/components/menu/menu-types.ts), you'll notice something like this:

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

_Talk about how it was done_

insert this gif:
https://media.giphy.com/media/8SxGru3XzElqg/giphy.gif

## Fetching data

The first thing to do was list the movies. The [SWAPI](https://swapi.co/) was used to gather the star was data. One thing I did that's fun and can make people confused is that I listed the movies chronologically, but show the sequence number of the movies. This might be weird at first, as the movies' order was completely unordered. _Go figure George Lucas' head_.

I also wanted to have more info about the movies, like duration, plot, nominations, etc. To do so, I used the [Open Movie Database API](http://www.omdbapi.com/).

## The Force map
_Talk about how it was done_

## Jedi Mode
_Talk about how it was done_
