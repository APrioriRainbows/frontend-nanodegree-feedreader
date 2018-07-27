/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

	it('have a URL and that URL is defined', function(){
	    for(let feed of allFeeds){
		expect(feed.url).toBeDefined();
		expect(feed.url).not.toBe(0);
	    }
	});

	it('have a name and that name is defined', function(){
	    for(let feed of allFeeds){
		expect(feed.name).toBeDefined();
		expect(feed.name).not.toBe(0);
	    }
	});
    });

    describe('The menu', function() {
	let theMenu = document.querySelector('body');//store the menu in a variable
	let menuIcon = document.getElementsByClassName('menu-icon-link');//store the menu icon in a variable, so we can click it later
	let menuClass; //initialize class name at the beginning
	it('is hidden by default', function(){
	    menuClass = theMenu.className;//store the menu's class name at the beginning
	    expect(menuClass).toEqual('menu-hidden');
	});

	it('changes visibility on click', function(){
	    if(theMenu.className === 'menu-hidden'){
		menuIcon[0].click();//click the menu item!
		menuClass = theMenu.className;//store the menu's class name at the beginning
		expect(theMenu.className).not.toBe('menu-hidden');//check that the class gets toggled
	    }
	    if(theMenu.className === ''){
		menuIcon[0].click();
		menuClass = theMenu.className;//store the menu's class name at the beginning
		expect(theMenu.className).toBe('menu-hidden');
	    }
	    
	});
    });

    describe('Initial Entries', function() {
	beforeEach(function(done){
	    //load the first feed, and send in jasmine's done function as the callback function on loadFeed
	    loadFeed(0,done);
	});

	it('have at least one entry when feed is loaded', function(done){
	    let feedContainer = document.getElementsByClassName('feed');
	    //get the length of the HTMLcollection, which in this case, is the list of feed items
	    //and then check to make sure that the length isn't 0
	    expect(feedContainer[0].children.length).not.toBe(0);
	    done();
	});

    });
	

    describe('New Feed Selection', function() {
	let firstFeed;
        beforeEach(function(done){
	    loadFeed(0);
	    firstFeed = document.getElementsByClassName('feed')[0].innerHTML;
	    loadFeed(1,done); //load second feed item
	});
	it('should have different content when a new feed is selected',function(done){
	    let newFeed = document.getElementsByClassName('feed')[0].innerHTML;
	    expect(firstFeed).not.toEqual(newFeed);
	    done();
	});
    });
});
