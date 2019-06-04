/**
 * Returns the root driectory of Retro
 */
export const baseUrl = () : string => {
    const mode = process.env.NODE_ENV;
    switch (mode) {
        case 'production': {
            return '/newretro/';
        }
        case 'development': {
            return './'
        }
        default: {
            return '/'
        }
    }
};
