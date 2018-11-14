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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         //Check to make sure the URL of each feed is 1)present 2) Not empty
         it('has URLs', function() {
           for (feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });

         //Check to make sure the name of each feed is 1)present 2) Not empty
         it('has name', function() {
           for (feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });

    });

    describe("The menu", function() {
        let menu = $('body');
        // let menuHidden = menu.hasClass('menu-hidden');

           // On load, check if body tag has class 'menu-hidden',
           // hiding side menu
           it("hidden menu", function() {
             let menuHidden = menu.hasClass('menu-hidden');
             expect(menuHidden).toBeTruthy();
           });

           //check if side menu is showing after one click
           //and re-hidden after a second click
           it("Menu on click", function() {
             menuIcon = $('.menu-icon-link');
             menuIcon.trigger('click');
             let menuShow = menu.hasClass('menu-hidden');
             expect(menuShow).toBeFalsy();
             menuIcon.trigger('click');
             menuHidden = menu.hasClass('menu-hidden');
             expect(menuHidden).toBeTruthy();
           });
    });


    describe("Initial Entries", function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      //Checks if there are is at least one entry-link classed object in
      //the feed object by comparing throuth parentElement
      it("Check initial entries get loaded", function(done) {
        let feed = $('.feed')[0];
        let entryLink = $('.entry-link')[0];
        expect(entryLink.parentElement == feed).toBeTruthy();
        done();
        });

    });


    describe("New Feed Selection", function(){
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        })
      })

       // runs a check to ensure items in the original feed
       // (populated by loadFeed[0]) are not present in another loadFeed.
       // Ensures 1) Feed gets cleared each time 2) Feed repopulated by
       // different data set (ie not repopulated by loadFeed[0])

       it("Check entry list after change between selections", function(done) {
         let entryLink1 = $('.entry-link')
         loadFeed(1);
         let entryLink2 = $('.entry-link')
         for (entry in entryLink1){
           expect(entryLink2).not.toContain(entry);
         }
         done();
       });


    });

}()); //Close whole function
