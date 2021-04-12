import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { useDynamicStyle } from 'react-native-dynamic-styles';

export default function Sandbox() {
    const isFocused = useIsFocused();
    const [width, setWidth] = useState("60%");
    const [height, setHeight] = useState(5 * 80);

    let cardmarkup = `<div class="card">`;
    
    let suits = ["spades", "diamonds", "clubs", "hearts"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let deck = new Array();
    let hand = new Array();
    
    let a = -0.02;
    let h = 5;
    let k = 0.5;

    let diff = 0.1;
    let multi = 1.6;

 //   useEffect(() => { if (isFocused) { setupdeck(); addcards(1); } }, [isFocused]);

    const style = useDynamicStyle(
        () => ({
            hand:{
                width: width,
                position: "absolute",
                height: height,
                display: "flex",
                left: "20%",
                top: "10%",
                //border: 1px solid black;
            }
        }),
        []
    );

    const tyylit = (left, bottom, rot) => {
        const tyylei  = {
            left: left,
            bottom: bottom,
            transform: [{ rotate: rot + "deg" }]
        };
        return tyylei;
    }
    
    const setupdeck = () =>{
        var card = {Value: values[1], Suit: suits[1]};
        hand.push(card)
        for(var i = 0; i < suits.length; i++)
        {
            for(var x = 0; x < values.length; x++)
            {
                var card = {Value: values[x], Suit: suits[i]};
                deck.push(card);
            }
        }
        return deck;
    }
    deck = setupdeck();
    
    const shuffle = () =>{
        for (var i = 0; i < 1000; i++)
        {
            var location1 = Math.floor((Math.random() * deck.length));
            var location2 = Math.floor((Math.random() * deck.length));
            var tmp = deck[location1];
    
            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
    }
    
    const aligncards = () =>{
        let cards = hand;
        let count = cards.length;
        Array.from(cards).forEach(card => new function(){
            let i = Array.from(cards).indexOf(card);
            let width = parseInt(styles.card.width);
            let left = width * i / 2;
    
            let totalwidth = count * (width / 2) + width / 2;
            let handwidth = parseInt(styles.card.width);
    
            if(totalwidth > handwidth){
                //shift the cards to fit with minimal margin leftover
                let overflow = totalwidth - handwidth;
                let shift = (overflow / (count - 1));
                left -= shift * i;
                totalwidth = handwidth;
            }
            let leftdif = (handwidth - totalwidth) / 2;
            
            left += leftdif;
            
           // $(card).css('left', left + 'px');
    
            let center = left + width / 2;
            let xpos = center / handwidth * 10;
            let ypos = getypos(xpos);
            let rot = getrotation(xpos);
    
            let bottom = (ypos / k) * styles.hand.height / 4;

            return tyylit(left, bottom, rot);
      //      $(card).css("bottom", bottom + "px");
       //     $(card).css("transform", "rotate(" + rot + "deg)");
        });
    }
    
    const addcards = (count) =>{
        let delay = 300;
        hand.push(getrandomcard());
       // aligncards();
        count --;
        let x = setInterval(() => {
            if(count < 1){
                clearInterval(x);
            }
            else{
                hand.push(cardmarkup);
            //    aligncards();
                count --;
            }
        }, delay);
    }
    
    const getrandomcard = () =>{
        let card = deck[0];
        deck = deck.slice(1);
        let markup = cardmarkup;
        markup += `<span class="value">${card.Value}</span><span class="suit">${card.Suit}</span></div>`;
        return markup;
    }
    
    const  getrotation = (xpos) =>{
        let ypos = getypos(xpos);
        if(xpos < h){
            //left of the vertex
            let newx = xpos + diff;
            let newy = getypos(newx);
    
            let adjacent = newx - xpos;
            let opposite = newy - ypos;
            let angle = Math.atan(opposite / adjacent);
            angle *= 180;
            angle /= Math.PI;
            angle = 0 - angle;
            return angle * multi;
        }
        else if(xpos > h){
            //right of the vertex
            let newx = xpos - diff;
            let newy = getypos(newx);
    
            let adjacent = newx - xpos;
            let opposite = newy - ypos;
            let angle = Math.atan(opposite / adjacent);
            angle *= 180;
            angle /= Math.PI;
            angle = 0 - angle;
            return angle * multi;
        }
        else{
            //on the vertex
            return 0;
        }
    }
    
    const getypos = (xpos) =>{
        let ypos = a * Math.pow((xpos - h), 2) + k;
        return ypos;
    }

    return(
        <>
        <Button title="add card" onPress={() => addcards(1)}></Button>
        <Text nativeID="hand" style={styles.hand, tyylit(aligncards())}>{hand}</Text>
        </>
    )
}

const styles = StyleSheet.create({ 
 //   *{
 //       padding: 0;
  //      margin: 0;
 //   },
 //   body:{
 //   overflow:hidden,
 //   },
    hand:{
        width: "60%",
        position: "absolute",
        height: 5 * 80,
        display: "flex",
        left: "20%",
        top: "10%",
        //border: 1px solid black;
    },
    card:{
        width: 2.5 * 80,
        height: 3.5 * 80,
        position: "absolute",
        display: "flex",
        bottom: -100,
        left: 50% - 2.5 * 80,
        backgroundColor: "white",
   //     boxshadow: 0p 0px 8px 1px rgba($color: #000000, $alpha: 0.2),
        borderRadius: 5,
        zIndex: 1,
    //    transition: 0.5s left ease, 0.5s bottom ease,
     //   userSelect: "none",
        
    /*    hover{
        
        }
        > span{
            display: block;
        }
        .value{
            font-weight: bolder;
            font-size: 30px;
            margin: 5px;
        }
        .suit{

        } */
    }
});