import React from 'react';
import TextBox from './textbox.component';

const AutoFitTextBox = TextBoxComponent =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.svgTextNode = React.createRef();
      this.state = { scale: 1 };
    }

    componentDidMount() {
      const { width, height } = this.props;
      const textBBox = this.getTextBBox();
      const widthScale = width / textBBox.width;
      const heightScale = height / textBBox.height;
      const scale = Math.min(widthScale, heightScale);
      console.log(textBBox.width)

      this.setState({ scale });
    }

    getTextBBox() {
      const svgTextNode = this.svgTextNode.current;
      return svgTextNode.getBBox();
    }

    render() {
      const { scale } = this.state;
      return (
        <TextBox
          forwardRef={this.svgTextNode}
          fontSize={`${scale}em`}
          {...this.props}
        />
      );
    }
  };

export default AutoFitTextBox(TextBox);