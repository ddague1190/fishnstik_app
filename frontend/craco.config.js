module.exports = {
    style: {
      sass: {
        loaderOptions: {
          additionalData: `
            @import "src/sass/_base.scss";
            @import "src/sass/_mixins.scss";
            @import "src/sass/_typography.scss";
            @import "src/sass/_utilities.scss";
            @import "src/sass/_variables.scss";
            @import "src/sass/components/_buttons.scss";
            @import "src/sass/components/_inputs.scss";
            @import "src/sass/components/_form.scss";
          `,
        },
      },
    },
  };