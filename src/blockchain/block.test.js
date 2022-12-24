import Block from './block';

describe ('Block', () => {
    let timestamp;
    let previousBlock;
    let data;
    let hash;

    beforeEach(()=>{
        timestamp = new Date(2010, 0, 1);
        previousBlock = Block.genesis;
        data = 't3St-d4t4';
        hash = 'h4S4';
    });

    it('create an instance with parameters', () => {
        const block = new Block(timestamp, previousBlock.hash, hash, data)
        expect(block.timestamp).toEqual(timestamp);
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
    });

    it('use static mine()', () => {
        const block = Block.mine(previousBlock, data);

        expect(block.hash.length).toEqual(64);
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(data).toEqual(data);
    });

    it('use static hash()', () => {
        hash = Block.hash(timestamp, previousBlock.hash, data);

        const hasOutput = 'c6e67e876fd3ada6ffaf99774120312d9b29650cf117b148bec4fe6f654c0662';

        expect(hash).toEqual(hasOutput);
    });

    it('use toString()', () => {
        const block = Block.mine(previousBlock, data);

        expect(typeof block.toString()).toEqual('string');
    })
})