import React from 'react';
import Tag from '../Tag/Tag';
export function renderTags(taglist) {
	return taglist.map((tag) => {
		return <Tag tagName={tag} />;
	});
}

export function renderDate(str) {
	const date = new Date(str);
	switch (date.getMonth()) {
		case 0:
			return `Январь, ${date.getDay()}, ${date.getFullYear()}`;
		case 1:
			return `Февраль, ${date.getDay()}, ${date.getFullYear()}`;
		case 2:
			return `Март, ${date.getDay()}, ${date.getFullYear()}`;
		case 3:
			return `Апрель, ${date.getDay()}, ${date.getFullYear()}`;
		case 4:
			return `Май, ${date.getDay()}, ${date.getFullYear()}`;
		case 5:
			return `Июнь, ${date.getDay()}, ${date.getFullYear()}`;
		case 6:
			return `Июль, ${date.getDay()}, ${date.getFullYear()}`;
		case 7:
			return `Август, ${date.getDay()}, ${date.getFullYear()}`;
		case 8:
			return `Сентябрь, ${date.getDay()}, ${date.getFullYear()}`;
		case 9:
			return `Август, ${date.getDay()}, ${date.getFullYear()}`;
		case 10:
			return `Ноябрь, ${date.getDay()}, ${date.getFullYear()}`;
		case 11:
			return `Декабрь, ${date.getDay()}, ${date.getFullYear()}`;
		default:
			return null;
	}
}
