---
title: JavaScript is VBA with aspirations
date: 2021-02-16
---
JavaScript is overused. That's a fact. People have been using it for everything, and that is way too much. They have built entire office suites based on JavaScript. They have worried way too much about whether they could make something in JavaScript, forgetting to think about whether they should.

The reason I'm bringing this up is because I'm annoyed by it. I'm annoyed that a blog uses 13MBs of JavaScript heap to display text (~~I will get rid of Blogger soon, I promise~~ I got rid of blogger). To be fair, [one of the very first websites][1] also seems to use like 6MBs, so it might not entirely be the page's fault. But still you have to allocate memory to the JavaScript engine, apparently even if there are no scripts being executed.

And this is nothing compared to the main problem, client side rendering. Someone thought it was a good idea, to take perfectly working server-generated and static websites, and throw React at it to make it more modern. Did it make the site better? No, it was a static site, it worked perfectly before. Did it make it more bloated though? Absolutely!

Imagine this with an Excel spreadsheet. Imagine for a minute, that instead of the spreadsheet having all the cells filled in by default as you would expect, they are empty at the start and filled in via VBA macros. Do you feel how absurd that is?

At their core, HTML documents were meant to be just that. Documents. Not applications and whatever they are using it for now, and definitely not user interfaces. Don't get me wrong, there is nothing wrong with a few forms or something, or even some minimal JavaScript. But don't build entire applications in it (no, forums are not full applications). That's the reason desktop software exists. As a rule of thumb, if it takes more then three seconds to download, it does not belong on the web. You should make a desktop application out of it. Or a mobile one. But don't, I beg you, make an entire office suite for the browser.

Even Electron is better. As much as I hate it, at least you don't have to download the full application every time. But please aim for actual, native desktop apps if possible.

Especially don't use webapps if your app doesn't need to interact with the server. There is no point in it. I could understand something like an ASCII to binary translator as a webapp, because you won't really use it often, but if you ask the user to upload a file to process chances are you shouldn't be making a web application.

TL;DR Use webapps if you mainly have content and not much interaction (forums are in this category because you are mostly reading previous posts and only sometimes commenting). If your aim is interactivity though, use native apps. Desktop development shouldn't be the taboo it is today.

A few tips
Here are a few resources for developing desktop applications:

UI Frameworks
* [Proton Native][2]: not great but not terrible either
* [C++][3]: check out these libraries if you're using C++
* For Python you can use Tkinter, PySide2, pyQt, or GTK
* For C: GTK is my best idea for now
* .NET: Avalonia

[1]: http://info.cern.ch/hypertext/WWW/TheProject.html
[2]: https://proton-native.js.org/
[3]: https://philippegroarke.com/posts/2018/c++_ui_solutions/