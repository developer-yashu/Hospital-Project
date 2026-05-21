// 1. Reverse a String

// const str = "Hello word";
// let  revers=" ";
// for(let i=0;i<str.length;i++){
//     revers=str[i]+revers;

// }
// console.log("Revers",revers);




//2. Find the Largest Number
// let arr=[1,2,3,9,4,5,12,11,7];
// let Largest=0;
// for(let i=0;i<arr.length;i++){
//     if(arr[i]>Largest){
//         Largest=arr[i]
//     }
// }
// console.log(Largest)



//3. Count Vowels
// let str = "hello";
// let Count=0;
// for(let i=0;i<str.length;i++){
//     if(str[i]=='a' || str[i]=='e' || str[i]=='e' || str[i]=='i' || str[i]=='o' || str[i]=='u'){
//         Count++
//     }
// }
// console.log(Count);



// 4. Sum of Array

// let arr = [1,2,3];
// let sum=0;
// for(let i=0;i<arr.length;i++){
//     sum=sum+arr[i]
// }
// console.log(sum);




//5 Remove Duplicates
// let num = [1,2,2,3,5,3];
// let unique = [];

// for(let i=0;i<num.length;i++){
//     let dupicates=false;
//     for(let j=0;j<num.length;j++){
//         if(num[i]===unique[j]){            
//             dupicates=true
//         }
//     }
//     if(!dupicates){
//         unique.push(num[i])
//     }
// }
// console.log(unique);


//6 Longest Word
// let words = ("The quick brown fox");
// let word = words.split(" ");
// console.log(word);

// let longest = '';

// for(let i=0;i<word.length;i++){
//     if(word[i].length>longest.length){
//         longest=word[i]
//     }
// }
// console.log(longest)



//7. Count Characters
// let str = "hello word hello";
// let obj = {};

// for(let i=0;i<str.length;i++){
//     let Count=str[i];
//     if(Count[obj]){
//         obj[Count]+=1
//     }
//     else {
//         obj[Count]=1
//     }
// }
// console.log(obj);



// 9. Find Duplicates  [2,4]
// let arr = [1,2,2,3,4,4];
// let duplicate = [];

// for(let i=0;i<arr.length;i++){
//     for(let j=i+1;j<arr.length;j++){
//         if(arr[i]==arr[j]){
//             duplicate.push(arr[i])
//         }
//     }
// }
// console.log(duplicate)


// Reverse Words
// let str="hello word";
// let revers=" ";
// for(let i=0;i<str.length;i++){
//     revers=str[i]+revers;
// }
// console.log(revers);


/*11. Merge Two Objects
Example: mergeObjects({a:1},{a:2,b:3}) → {a:2,b:3}.*/

// let obj1 = {a:1};
// let obj2 = {a:2,b:3};

// let merge={...obj1,...obj2}
// console.log(merge);


/*12. Sum 1 to n
Example: sum(5) → 15.*/

// let sum=0;
// for(let i=0;i<=5;i++){
//     sum=sum+i;
// }
// console.log(sum);


/*13. Count Even Numbers up to n
Example: countEven(10) → 5.*/

// let Count=0;
// for(let i=1;i<=11;i++){
//     if(i%2==0){
//         Count++
//     }
// }
// console.log(Count);




/*14. Multiply Array by 2
Example: [1,2,3] → [2,4,6].*/

// let arr=[1,2,3];
// let data=[];
// for(let i=0;i<arr.length;i++){
//     data.push(arr[i]*2)
// }
// console.log(data);



    /*16. Palindrome Check
Example: isPalindrome("madam") → true.*/
// let arr='madam'
// let revers="";
// for(let i=0;i<arr.length;i++){
//     revers=arr[i]+revers
// }
//     if(revers==arr){
//         console.log(true)
//     }
//     else{
//         console.log(false)
//     }

// console.log(revers);

/*17. Factorial (Recursion)
Example: factorial(5) → 120.*/
// let fact=1;
// for(let i=1;i<=5;i++){
//     fact=i*fact;

// }
// console.log(fact);



/*18. Fibonacci Sequence
Example: fibonacci(5) → [0,1,1,2,3].*/
// let a=0;
// let b=1;
// for(let i=0;i<=5;i++){
//     console.log(a);
//     c=a+b;
//     a=b;
//     b=c;       
// }
    

/*19. Array Intersection
Example: intersection([1,2,3],[2,3,4]) → [2,3].*/
// let arr1=[1,2,3];
// let arr2=[2,3,4]
// let num=[]
// for(let i=0;i<arr1.length;i++){
//     if(arr2.includes(arr1[i])){
//         num.push(arr1[i])
//     }
// }
// console.log(num);


/*20. Array Difference
Example: difference([1,2,3],[2,3,4]) → [1].*/

// let arr1 = [1,2,3];
//  let arr2 = [2,3,4];
// let num=[]

//  for(let i=0;i<arr1.length;i++){
//     if(!arr2.includes(arr1[i])){
//         num.push(arr1[i])
//     }
//  }
//  console.log(num);
 




