"use client";

import React, { useState, useEffect } from 'react';

// Importe todas as bibliotecas de ícones que você pode precisar
import * as AiIcons  from 'react-icons/ai';
import * as BsIcons  from 'react-icons/bs';
import * as BiIcons  from 'react-icons/bi';
import * as CgIcons  from 'react-icons/cg';
import * as CiIcons  from 'react-icons/ci';
import * as DiIcons  from 'react-icons/di';
import * as FaIcons  from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as FcIcons  from 'react-icons/fc';
import * as FiIcons  from 'react-icons/fi';
import * as GiIcons  from 'react-icons/gi';
import * as GoIcons  from 'react-icons/go';
import * as GrIcons  from 'react-icons/gr';
import * as HiIcons  from 'react-icons/hi';
import * as Hi2Icons from 'react-icons/hi2';
import * as ImIcons  from 'react-icons/im';
import * as IoIcons  from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as LiaIcons from 'react-icons/lia';
import * as LuIcons  from 'react-icons/lu';
import * as MdIcons  from 'react-icons/md';
import * as PiIcons  from 'react-icons/pi';
import * as RiIcons  from 'react-icons/ri';
import * as RxIcons  from 'react-icons/rx';
import * as SiIcons  from 'react-icons/si';
import * as SlIcons  from 'react-icons/sl';
import * as TbIcons  from 'react-icons/tb';
import * as TfiIcons from 'react-icons/tfi';
import * as TiIcons  from 'react-icons/ti';
import * as VscIcons from 'react-icons/vsc';
import * as WiIcons  from 'react-icons/wi';

const iconLibraries: { [key: string]: any } = {
  ai  : AiIcons,
  bs  : BsIcons,
  bi  : BiIcons,
  cg  : CgIcons,
  ci  : CiIcons,
  di  : DiIcons,
  fa  : FaIcons,
  fa6 : Fa6Icons,
  fc  : FcIcons,
  fi  : FiIcons,
  gi  : GiIcons,
  go  : GoIcons,
  gr  : GrIcons,
  hi  : HiIcons,
  hi2 : Hi2Icons,
  im  : ImIcons,
  io  : IoIcons,
  io5 : Io5Icons,
  lia : LiaIcons,
  lu  : LuIcons,
  md  : MdIcons,
  pi  : PiIcons,
  ri  : RiIcons,
  rx  : RxIcons,
  si  : SiIcons,
  sl  : SlIcons,
  tb  : TbIcons,
  tfi : TfiIcons,
  ti  : TiIcons,
  vsc : VscIcons,
  wi  : WiIcons
};

const useDynamicIcon = (iconIdentifier: string) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const [lib, iconName] = iconIdentifier.split('/');
    const library = iconLibraries[lib.toLowerCase()];

    if (library && library[iconName]) {
      setIconComponent(() => library[iconName]);
    } else {
      setIconComponent(null);
    }
  }, [iconIdentifier]);

  return IconComponent;
};

export default useDynamicIcon;
