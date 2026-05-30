import { sanityClient } from "@/lib/sanity";

export async function getFooter() {
  return await sanityClient.fetch(`
    *[_type == "footer"][0]{
      logo{
        asset->{
          url
        }
      },

      receptionTitle,
      receptionPeriods[] {
        periodTitle,
        hours[] {
          text,
          isNote
        }
      },

      lessonTitle,
      lessonPeriods[] {
        periodTitle,
        hours[] {
          text,
          isNote
        }
      },

      addressTitle,
      address,
      googleMapLink,

      contactTitle,
      phoneNumbers[],
      email,

      paymentTitle,
      paymentMethods[],

      importantLinksTitle,
      importantLinks[],

      socialTitle,
      socialLinks[] {
        iconType,
        iconName,
        url,
        iconImage{
          asset->{
            url
          }
        }
      },

      copyrightText,
      poweredByText,
      poweredByLink
    }
  `);
}