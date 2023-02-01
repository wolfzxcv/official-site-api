import { DataInputFormat, DataOutputFormat } from '../@types/dataFormat';
import { formatTimestamp } from './formatTimestamp';

export const formatOutput = (data: DataInputFormat[]) => {
  const output: DataOutputFormat[] = data.map(each => {
    const date = each.showTime ? each.showTime : each.createTime;

    const time = formatTimestamp(date).slice(0, 10);

    const eachData: DataOutputFormat = {
      id: each.id,
      title: each.title,
      content: each.content,
      time
    };

    if (each.externalLink) {
      eachData.url = each.externalLink;
    }

    if (each.onTop) {
      eachData.onTop = !!each.onTop;
    }

    return eachData;
  });

  return output;
};
