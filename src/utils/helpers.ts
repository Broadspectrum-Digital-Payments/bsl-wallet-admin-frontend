export const camelCaseToWords = (text: string = '') => {
    return text.replace(/([A-Z])/g, ' $1').toLowerCase();
}

export const getInitials = (name: string = ''): string => {
    const words = name.split(' ');

    if (words.length === 0) {
        return 'OP'
    } else if (words.length === 1) {
        return words.map(word => word.substring(0, 2).toUpperCase()).join('')
    } else {
        return words.map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('');
    }
};

export const capitalizeFirstLetter = (text: string = ''): string => {
    return text.charAt(0).toUpperCase() + text.slice(1)
};

export const isImageAvailable = (imageSrc: string = '', extension: string = 'png') => {
    try {
        const image = new Image();
        image.src = `/assets/images/${imageSrc}.${extension}`;
        return image.complete;
    } catch (error) {
        console.error('Error checking image availability', error);
        return false;
    }
};

export const getGreeting = () => {
    let hour = new Date().getHours();
    return "Good " + (hour < 12 && "morning" || hour < 18 && "afternoon" || "evening")
};


export const downloadFile = async (response: Response | Blob, fileName: string = 'sample.txt') => {
    try {
        const blob = (response instanceof Response) ? await response.blob() : response;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};
