/**
 * Returns the root driectory of Retro
 */
export const baseUrl = () : string => {
    const mode = process.env.NODE_ENV;
    switch (mode) {
        case 'production': {
            return '/retro/';
        }
        case 'development': {
            return './'
        }
        default: {
            return '/'
        }
    }
};
