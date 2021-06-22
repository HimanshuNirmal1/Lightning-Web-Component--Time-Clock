import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id'; 
import NAME_FIELD from '@salesforce/schema/User.Name';

     

export default class TimeClock extends LightningElement {

    @track error ;
     @track name;
     @track myTime;
     @track startTime;
     @track endTime;
     @track startTimeDisplay;
     @track endTimeDisplay;
     @track showLogs;
     @track logs=[];

     timeStart = false;
     time1;
     @wire(getRecord, {
         recordId: USER_ID,
         fields: [NAME_FIELD]
     }) wireuser({
         error,
         data
     }) {
         if (error) {
            this.error = error ; 
         } else if (data) {
             this.name = data.fields.Name.value;
         }
     }
 

     time = "12 PM";
     greeting = "Hello, Himanshu";

    // @lwc method gets called as soon as the component is initialized
    connectedCallback(){
        this.displayTime();
       
        //@lwc method repeatedly calls a function with a fixed time delay between each call
        setInterval( () => 
        {
            this.displayTime();
            //console.log("set interval called");
        }, 1000);
    }

    //lwc method to display the initial time and greeting
    displayTime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)} : ${this.convertSingleToDouble(min)} ${this.getAmPm(hour)}`;
        this.displayGreeting(hour);
        //console.log(this.name);
        
    }
        //lwc method to display greeting with current user name 
        displayGreeting(hour){
            if (hour < 12){
                this.greeting = 'Good Morning, '+this.name+'!';
            }

            else if(hour >= 12 && hour < 17){
                this.greeting = 'Good Afternoon, '+this.name+'!';
            }

            else if(hour >=17 && hour <= 20){
                this.greeting = 'Good Evening, '+this.name+'!';
            }

            else{
                this.greeting = 'Good Night  '+this.name+'!';
            }
        }
        //lwc method to convert and show time in the 12 hour format
        getHour(hour){
            return hour == 0 ? 12 : hour > 12 ? (hour - 12) : hour ;
        }
        
        //lwc method to display time in AM or PM format
        getAmPm(hour){
            return hour >= 12 ? "PM" : "AM" ;
        }

        //lwc method to display single digit as double digits
        convertSingleToDouble(hour){
            return hour < 10 ? '0'+ hour : hour;
        }

        //lwc method to handle the button click    
        handleClick(event){
            //console.log(this.time);
            this.time1 = new Date().getTime() / 1000;
            console.log(this.time1);
            if(this.timeStart == false){
                this.startTime = this.time1;
                this.endTimeDisplay="";
                this.startTimeDisplay = this.time;
                this.timeStart = true;
               //console.log(this.startTime);
            }
            else{
                this.endTime = this.time1;
                this.endTimeDisplay = this.time;
                this.timeStart = false;
                //console.log(this.endTime);
            }
            
            
            if(this.endTime!=null){
                

                this.timeLog = this.endTime - this.startTime;
                console.log(this.timeLog);

                var d = Number(this.timeLog);
                var h = Math.floor(d / 3600);
                var m = Math.floor(d % 3600 / 60);
                var s = Math.floor(d % 3600 % 60);

                var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
                var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
                var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                console.log(hDisplay + mDisplay + sDisplay); 
                this.myTime = hDisplay + mDisplay + sDisplay;
            }
            
        }

         handleClickLogCheck(event){
            
            if(this.timeStart == true){
                this.showLogs = this.startTimeDisplay;
                this.logs.push(this.showLogs);
                
            }

            else{
                this.showLogs = this.endTimeDisplay;
                this.logs.push(this.showLogs);
            }
            
            
            //console.log(this.logs);
        }

}
    






