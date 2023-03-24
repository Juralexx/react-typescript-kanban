import { css } from 'styled-components';

/**
 * Variables globales
 */

const variables = css`
    :root {
        --primary       : #888fdc;
        --primary-rgb   : 98, 110, 212;
        --primary-light : #838DE3;
        --primary-dark  : #8087DA;

        --body           : #ffffff;
        --body-rgb       : 255, 255, 255;
        --body-light     : #F8FAFC;
        --body-light-rgb : 248, 250, 252;

        --content           : #ffffff;
        --content-rgb       : 255, 255, 255;
        --content-light     : #eef2f9;
        --content-light-rgb : 248, 250, 252;
        --content-x-light   : #1A2D48;

        --navbar     : #ffffff; //linear-gradient(to right, #96a4fd 70%, #67b0f8);
        --navbar-rgb : 255, 255, 255;
        --footer     : #ffffff;
        --footer-rgb : 255, 255, 255;

        --sidebar-color : #c7ccd3;

        --text           : #0F172B;
        --text-secondary : #9799b0;
        --text-tertiary  : #0F172B;
        --title          : #504e76;

        --light-border : #E2E8F0;

        --input       : #ffffff;
        --input-text  : #696969;
        --placeholder : #9a9fa7;
        
        --modal-cover : rgba(0, 0, 0, 0.3);

        --tooltip : var(--content);

        --slate            : #8892b0;
        --slate-rgb        : 136, 146, 176;
        --dark-slate       : #495670;
        --dark-slate-rgb   : 73,  86,  112;
        --light-slate      : #a8b2d1;
        --light-slate-rgb  : 168, 178, 209;
        --xlight-slate     : #ccd6f6;
        --xlight-slate-rgb : 204, 214, 246;
        --navy             : #0a192f;
        --navy-rgb         : 10,  25,  47;
        --dark-navy        : #020c1b;
        --dark-navy-rgb    : 2,   12,  27;
        --light-navy       : #112240;
        --light-navy-rgb   : 17,  34,  64;
        --xlight-navy      : #233554;
        --xlight-navy-rgb  : 35,  53,  84;
        --blue             : #2562ea;
        --blue-rgb         : 37,  98,  234;
        --xblue            : #0284c7;
        --xblue-rgb        : 2,   132, 199;
        --light-blue       : #00aefd;
        --light-blue-rgb   : 0,   174, 253;
        --xlight-blue      : #00c2f5;
        --xlight-blue-rgb  : 0,   194, 245;
        --turquoise        : #2edbdb;
        --turquoise-rgb    : 46,  219, 219;
        --xturquoise       : #47e7e7;
        --xturquoise-rgb   : 71,  231, 231;
        --dark-green       : #25954c;
        --dark-green-rgb   : 37,  149, 76;
        --green            : #3dcf70;
        --green-rgb        : 61,  207, 112;
        --xgreen           : #3ee58c;
        --xgreen-rgb       : 62,  229, 140;
        --neon-green       : #64ffda;
        --neon-green-rgb   : 100, 255, 218;
        --purple           : #4338ca;
        --purple-rgb       : 67,  56,  202;
        --xpurple          : #6d71ff;
        --xpurple-rgb      : 162, 108, 247;
        --red              : #be185d;
        --red-rgb          : 190, 24,  93;
        --xred             : #ec4899;
        --xred-rgb         : 236, 72,  153;
        --orange           : #ffb004;
        --orange-rgb       : 255, 176, 4;
        --xorange          : #FED06C;
        --xorange-rgb      : 254, 208, 108;
        --yellow           : #ffd427;
        --yellow-rgb       : 255, 212, 39;
        --xyellow          : #ffe542;
        --xyellow-rgb      : 255, 229, 66;
        --grey             : #c2c2c2;
        --grey-light       : #dedede;
        --xgrey            : #f0f0f0;
        --xgrey-light      : #f5f5f5;
        --white            : #ffffff;

        --success     : #198754;
        --success-rgb : 25, 135, 84;
        --info        : #0dcaf0;
        --info-rgb    : 13, 202, 240;
        --warning     : #ffc107;
        --warning-rgb : 255, 193, 7;
        --danger      : #dc3545;
        --danger-rgb  : 220, 53,  69;

        --classic-blue          : #0d6efd;
        --classic-blue-rgb      : 13, 110, 253;
        --classic-indigo        : #6610f2;
        --classic-indigo-rgb    : 102, 16, 242;
        --classic-purple        : #6f42c1;
        --classic-purple-rgb    : 111, 66, 193;
        --classic-pink          : #d63384;
        --classic-pink-rgb      : 214, 51, 132;
        --classic-red           : #dc3545;
        --classic-red-rgb       : 220, 53, 69;
        --classic-orange        : #fd7e14;
        --classic-orange-rgb    : 253, 126, 20;
        --classic-yellow        : #ffc107;
        --classic-yellow-rgb    : 255, 193, 7;
        --classic-green         : #198754;
        --classic-green-rgb     : 25, 135, 84;
        --classic-teal          : #20c997;
        --classic-teal-rgb      : 32, 201, 151;
        --classic-cyan          : #0dcaf0;
        --classic-cyan-rgb      : 13, 202, 240;
        --classic-gray          : #6c757d;
        --classic-gray-rgb      : 108, 117, 125;
        --classic-gray-dark     : #343a40;
        --classic-gray-dark-rgb : 52, 58, 64;
        --classic-light         : #f8f9fa;
        --classic-light-rgb     : 248, 249, 250;
        --classic-dark          : #212529;
        --classic-dark-rgb      : 33, 37, 41;

        --xs : 576px;
        --sm : 768px;
        --md : 992px;
        --lg : 1200px;
        --xl : 1400px;

        --rounded-sm   : 0.125rem;
        --rounded-md   : 0.375rem;
        --rounded-lg   : 0.5rem;
        --rounded-xl   : 0.75rem;
        --rounded-2xl  : 1rem;
        --rounded-3xl  : 1.5rem;
        --rounded-full : 9999px;

        --shadow-one          : 0px 12px 34px rgb(32 52 89 / 25%);
        --shadow-two          : 0px 9px 28px 0px rgb(0 0 0 / 15%);
        --shadow-three        : 0 10px 20px 0 rgb(0 0 0 / 5%);
        --shadow-smooth       : 0px 9px 26px 0px rgb(0 0 0 / 15%);
        --shadow-x-smooth     : 0 20px 30px 0 rgb(28 9 80 / 5%);
        --shadow-light        : 0 20px 25px -5px rgb(0 0 0 / 5%), 0 8px 10px -6px rgb(0 0 0 / 5%);
        --shadow-top          : 0 -9px 10px -2px rgba(0, 0, 0, 0.10);
        --shadow-bottom       : 0 12px 8px -5px rgba(0, 0, 0, 0.23);
        --shadow-left         : 20px 0 30px 0px rgb(28 9 80 / 5%);
        --shadow-right        : -8px 0 12px -3px rgba(0 0 0 / 15%);
        --shadow-inset-bottom : inset 0px -30px 33px -10px rgb(28 9 80 / 5%);
        --shadow-tiny         : rgb(0 0 0 / 15%) 0px 2px 2px 1px;
        --shadow-relief       : inset 0 1px 0 0 hsl(0deg 0% 100% / 5%);

        --font-fam-list : system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        --font-fam1     : 'Mona Sans', var(--font-fam-list);
        --font-fam2     : 'Fira Code', var(--font-fam-list);

        --font-3xl : 24px;
        --font-2xl : 22px;
        --font-xl  : 20px;
        --font-lg  : 18px;
        --font-md  : 16px;
        --font-sm  : 14px;
        --font-xs  : 12px;
        --font-2xs : 10px;
        --font-3xs : 8px;

        --easing     : cubic-bezier(0.645, 0.045, 0.355, 1);
        --transition : all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
`;

export default variables;