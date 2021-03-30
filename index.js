class dragWindow {
    constructor(parent, name, x, y){

        // Set properties
        this.parent = parent;
        this.name = name;
        this.x = x;
        this.y = y;
        this.isGrabbed = false;

        this.createWindow();        
        this.setPosition(x,y)

        // Add events listeners to move window
        this.window.addEventListener('mousedown', (event) => { 
            // Grab the window on click
            this.isGrabbed = true;
            
            const {x, y} = event;

            // Compute the offset between mouse and window
            this.xOffset = this.x - x;
            this.yOffset = this.y - y;
            
            this.window.style.zIndex = this.getZIndex();
            });

        this.window.addEventListener('mousemove', event => {
            const {x, y} = event;                        
            if (this.isGrabbed) {
                this.setPosition(x + this.xOffset, y + this.yOffset);

            }
            });

        this.window.addEventListener('mouseup', () => { 
            this.isGrabbed = false;
            });


    }

    getZIndex() {
        // Init global Zindex if it doesn't exist
        if(this.parent.maxZ === undefined) {
            this.parent.maxZ = 0;
        }
        
        // Prevent big numbers for zIndex
        if(this.parent.maxZ > 1000) {
            for(let i=0; i<this.parent.children.length; i++){
                this.parent.children[i].style.zIndex -= 1000;
            }
            this.parent.maxZ = 0;
        }


        return ++this.parent.maxZ;
    }

    // Generate a new window in the DOM
    createWindow(){
        
        

        // Creating the window
        const window = document.createElement("div");
        window.className = 'window';
        window.style.zIndex = this.getZIndex();
        
        // Creating title
        this.title =  document.createElement("div");
        this.title.className = 'window-title';
        this.title.innerText = this.name;
        window.appendChild(this.title)
    
        // Creating content
        const content = document.createElement("div");
        content.className = 'window-content';
        window.appendChild(content)
    
        // Creating the x position display inside content
        this.xText = document.createElement("div");
        this.xText.className = 'xPos';
        content.appendChild(this.xText);
    
        // Creating the y position display inside content
        this.yText = document.createElement("div");
        this.yText.className = 'yPos';
        content.appendChild(this.yText);
    
        // Adding window to the parent node 
        this.parent.appendChild(window);
        
        this.window = window;
    }

    // Display position inside the window
    displayPosition() {
        this.xText.innerText = 'x: ' + this.x + 'px';
        this.yText.innerText = 'y: ' + this.y + 'px';
    }

    // Set Window postion at a given x,y coordinate
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.displayPosition();

        this.window.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
}



// Select the div containing all windows
const [parent] = document.getElementsByClassName('windows');




const addWindow = () => {
    const index = parent.children.length++;

    const xPos = Math.round(Math.random()*1500);
    const yPos = Math.round(Math.random()*647);

    new dragWindow(parent, `window ${index}`, xPos, yPos);
};








