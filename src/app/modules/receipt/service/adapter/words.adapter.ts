import { ClickPosition } from "src/app/shared/models/interface-receipt";

export interface WordPosition {
    readonly description?: string;
    readonly id?: number;
    readonly vertices?: ClickPosition[];
}
export interface BasicReceiptData {
    readonly nip?: string;
    readonly shopName?: string;
    readonly totalPrice?: string;
}


export class WordPositionAdapter {
    constructor(private wordsPosition: WordPosition[]) { }

    adapt(): BasicReceiptData {
        let nip = '';
        let shopName = '';
        let totalPrice = '';

        this.wordsPosition.forEach((word: WordPosition) => {

            if (word.description === 'NIP') {
                const nipIndex = this.wordsPosition.indexOf(word) + 2;
                nip = this.wordsPosition[nipIndex]?.description || '';
            }

            if (word.description === 'S.C.' || word?.description=== 'sp. z o.o'  || word.description=== 'Sp. z o.o' ) {
                shopName = this.wordsPosition[this.wordsPosition.indexOf(word) - 1]?.description + ' ' + word.description;
            }

            if (word.description === 'SUMA') {
                let totalPriceIndex = this.wordsPosition.indexOf(word) + 2;
    
            
                while (['PLN', 'USD', 'EUR'].includes(this.wordsPosition[totalPriceIndex]?.description||'')) {
                    totalPriceIndex++;
                }
    
                totalPrice = this.wordsPosition[totalPriceIndex]?.description || '';
            }
        });

        return {
            nip: nip,
            shopName: shopName,
            totalPrice: totalPrice
        };
    }
}