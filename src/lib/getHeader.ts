// src/lib/getHeader.ts

import { sanityClient } from "@/lib/sanity";

export async function getHeader() {
  return await sanityClient.fetch(`
    *[_type == "header"][0]{
      logo{
        asset->{
          url
        }
      },

      topMenus[]{
        title,
        link,
        openInNewTab,
        iconType,
        iconName,
        iconImage{
          asset->{
            url
          }
        }
      },

      mobileMenus[]{
        title,
        link,
        openInNewTab,
        iconType,
        iconName,
        iconImage{
          asset->{
            url
          }
        },
        submenu[]{
          title,
          link,
          openInNewTab
        }
      }
    }
  `);
}