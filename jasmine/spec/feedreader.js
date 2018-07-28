$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();//there should be a feeds array
            expect(allFeeds.length).not.toBe(0);//that array should some feeds in it
        });

	it('have a URL and that URL is defined', function(){
	    for(let feed of allFeeds){
		expect(feed.url).toBeDefined();//all feeds should have a url
		expect(feed.url.length).not.toBe(0);//that url is defined
	    }
	});

	it('have a name and that name is defined', function(){
	    for(let feed of allFeeds){
		expect(feed.name).toBeDefined();//expect all feeds to have a name
		expect(feed.name.length).not.toBe(0);//expect the name is not blank
	    }
	});
    });

    describe('The menu', function() {
	let theMenu = document.querySelector('body');//store the menu in a variable
	let menuIcon = document.getElementsByClassName('menu-icon-link');//store the menu icon in a variable, so we can click it later
	let menuClass; //initialize class name at the beginning
	it('is hidden by default', function(){
	    menuClass = theMenu.classList;//store the menu's class name at the beginning
	    expect(menuClass.contains('menu-hidden')).toBe(true);
	});

	it('changes visibility on click', function(){
	    if(theMenu.classList.contains('menu-hidden')){
		menuIcon[0].click();//click the menu item!
		menuClass = theMenu.classList;//store the menu's class names at the beginning
		expect(menuClass.contains('menu-hidden')).toBe(false);//check that the class gets toggled
	    }
	    if((theMenu.classList.contains('menu-hidden')) === false){
		menuIcon[0].click();
		menuClass = theMenu.classList;//store the menu's class name at the beginning
		expect(menuClass.contains('menu-hidden')).toBe(true);
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
	    loadFeed(0);//load first first
	    firstFeed = document.getElementsByClassName('feed')[0].innerHTML;//set first feed html string to a variable 
	    loadFeed(1,done); //load second feed item and start it block
	});
	it('should have different content when a new feed is selected',function(done){
	    let newFeed = document.getElementsByClassName('feed')[0].innerHTML;//set second feed html string to a variable
	    expect(firstFeed).not.toEqual(newFeed);//compare them and expect them to be different
	    done();
	});
    });
});
