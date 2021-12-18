import { data_example } from "./data_example.js";
import { data } from "./data.js";
import { data_example2 } from "./data_example2.js";
import { data_example3 } from "./data_example3.js";

const hexToBin = data => {
    const hex = {
        "0": "0000",
        "1": "0001",
        "2": "0010",
        "3": "0011",
        "4": "0100",
        "5": "0101",
        "6": "0110",
        "7": "0111",
        "8": "1000",
        "9": "1001",
        "A": "1010",
        "B": "1011",
        "C": "1100",
        "D": "1101",
        "E": "1110",
        "F": "1111",
    };
    return data.split('').map(el => hex[el]).join('');
}

const parseHeader = data => {
    const packet = { version: parseInt(data.slice(0, 3), 2), id: parseInt(data.slice(3, 6), 2) }
    return { bin: data.slice(6), packet }
}

const parseLiteral = (bin, packet) => {
    const content = '';
    let i = 0;
    while (i < bin.length) {
        const str = bin.slice(i, i + 5);
        i += 5;
        packet.content += str.slice(1, 5);
        if (str[0] === '0') { break; }
    }
    packet.content = parseInt(packet.content, 2);
    packet.size = i + 6;
    return { bin: bin.slice(i), packet }
}

const parseOperator = bin => {
    const packets = [];
    
    const addPacket = () => {
        const res = parsePacket(bin);
        const size = res.packet.size;
        packets.push(res.packet);
        bin = bin.slice(size);
        return size;
    }
    
    switch (+bin[0]) {
        case 0: 
            let l = parseInt(bin.slice(1, 16), 2);
            bin = bin.slice(16);
            while (l > 0 && bin.includes('1')) {
                const size = addPacket();
                l -= size;
            }
            break;
        case 1:
            const n = parseInt(bin.slice(1, 12), 2);
            bin = bin.slice(12);
            while (n > 0) {
                addPacket();
                n--;
            }
            break;
    }
    return packets;
}

const parsePacket = data => {
    let { bin, packet } = parseHeader(data);
    if (packet.id === 4) { 
        return parseLiteral(bin, packet);
    } else {
        packet.content = parseOperator(bin);
        return packet;
    }
}

const decode = (data) => {
    const packets = [];
    packets.push(parsePacket(data));
    console.log(packets);
}

const countVersions = data => {
    const bin = hexToBin(data);
    console.log(decode(bin));
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countVersions(data_example2);
}

export { countVersions };